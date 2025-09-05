import Imap from 'imap';
import { simpleParser } from 'mailparser';
import nodemailer from 'nodemailer';
import { Readable } from 'stream';
import { Email, Settings } from './types';
import { getEmailDatabase } from './emailDatabase';

const ensureDate = (date: Date | string | undefined): Date => {
  if (!date) return new Date();
  return typeof date === 'string' ? new Date(date) : date;
};

class EmailService {
  private imapConfig: any;
  public imap: Imap;
  public smtpTransport: nodemailer.Transporter;
  private connected: boolean;
  private settings: Settings;
  private database = getEmailDatabase();

  constructor() {
    this.imapConfig = {
      user: process.env.EMAIL_USER || '',
      password: process.env.EMAIL_PASSWORD || '',
      host: process.env.EMAIL_HOST || 'imap.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '993'),
      tls: true,
      tlsOptions: { rejectUnauthorized: false }
    };

    this.connected = false;
    this.imap = new Imap(this.imapConfig);
    this.settings = {
      autoReply: true,
      delayMinutes: 3,
      responseTemplate:
        "Thank you for your inquiry about our property. Our team will contact you within 24 hours to answer your questions and schedule a viewing. In the meantime, feel free to browse our available listings on our website."
    };

    this.setupImapEvents();
    this.smtpTransport = this.createSMTPTransport();
    this.verifySMTP();
  }

  private createSMTPTransport(): nodemailer.Transporter {
    try {
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || '',
          pass: process.env.EMAIL_PASSWORD || ''
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        tls: { rejectUnauthorized: false }
      });
      console.log('✅ Using Gmail service configuration for SMTP');
      return transport;
    } catch {
      const hostPortConfig: any = {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER || '',
          pass: process.env.EMAIL_PASSWORD || ''
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        tls: { rejectUnauthorized: false, minVersion: 'TLSv1.2' }
      };
      console.log('✅ Using host/port configuration for SMTP');
      return nodemailer.createTransport(hostPortConfig);
    }
  }

  private setupImapEvents(): void {
    this.imap.once('ready', () => {
      console.log('✅ IMAP connected successfully');
      this.connected = true;
    });

    this.imap.once('error', (err: Error) => {
      console.error('❌ IMAP connection error:', err);
      this.connected = false;
    });

    this.imap.once('end', () => {
      console.log('ℹ️ IMAP connection ended');
      this.connected = false;
    });
  }

  private async verifySMTP(): Promise<void> {
    try {
      await this.smtpTransport.verify();
      console.log('✅ SMTP connection verified successfully');
    } catch {
      await this.tryAlternativeSMTPConfig();
    }
  }

  private async tryAlternativeSMTPConfig(): Promise<void> {
    console.log('🔄 Trying alternative SMTP configuration...');
    try {
      const altTransport = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER || '',
          pass: process.env.EMAIL_PASSWORD || ''
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        tls: { rejectUnauthorized: false }
      });
      await altTransport.verify();
      console.log('✅ Alternative SMTP configuration (SSL) works!');
      this.smtpTransport = altTransport;
    } catch (error) {
      console.error('❌ Alternative SMTP configuration also failed:', error);
    }
  }

  private getThreadId(email: any): string {
    if (email.inReplyTo) return email.inReplyTo;
    if (email.references && email.references.length > 0) return email.references[0];
    return email.messageId || `thread-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private shouldAutoReply(email: Email): boolean {
    const settings = this.getSettings();
    if (!settings.autoReply) return false;

    const conversation = this.database.getConversation(email.threadId);
    if (email.replied) return false;
    if (conversation.length <= 1) return true;

    const ourEmail = process.env.EMAIL_USER || '';
    const lastEmail = conversation[conversation.length - 1];
    if (lastEmail.from.includes(ourEmail)) return false;

    return true;
  }

  private generateContextAwareResponse(email: Email, history: Email[]): string {
    const isFirstResponse = history.filter(e => e.from.includes('@gmail.com')).length === 0;

    if (isFirstResponse) {
      const propertyMatch = email.subject.match(
        /(\d+\s+\w+\s+(Street|Avenue|Road|Drive|Lane|Boulevard)|[A-Z][a-z]+\s+(Street|Avenue|Road|Drive|Lane|Boulevard))/i
      );
      const propertyName = propertyMatch ? propertyMatch[0] : 'the property';

      return `Thank you for your interest in ${propertyName}!

I'd be happy to provide more information and schedule a viewing at your convenience.

Could you please let me know:
1. What specific questions do you have about ${propertyName}?
2. What days/times work best for a viewing?
3. How many bedrooms/bathrooms are you looking for?

I'll follow up with detailed information and available viewing times.

Best regards,
Your Real Estate Team`;
    } else {
      return `Thank you for your follow-up message!

I'd be happy to help with any additional questions you have or schedule that viewing for you.

Could you please clarify what specific information you're looking for, or let me know what times would work best for a viewing?

Looking forward to helping you find your perfect home!

Best regards,
Your Real Estate Team`;
    }
  }

  private async processEmail(rawEmail: any): Promise<void> {
    try {
      const email: Email = {
        id: `email-${rawEmail.uid}-${Date.now()}`,
        from: rawEmail.from,
        subject: rawEmail.subject,
        date: ensureDate(rawEmail.date),
        text: rawEmail.text,
        html: rawEmail.html,
        messageId: rawEmail.messageId,
        inReplyTo: rawEmail.inReplyTo,
        references: rawEmail.references,
        uid: rawEmail.uid,
        replied: false,
        threadId: this.getThreadId(rawEmail)
      };

      this.database.addEmail(email);

      if (this.shouldAutoReply(email)) {
        const conversation = this.database.getConversation(email.threadId);
        const response = this.generateContextAwareResponse(email, conversation);

        setTimeout(async () => {
          const success = await this.sendAutoReply(email.from, email.subject, response, email.messageId);
          if (success) this.database.markAsReplied(email.messageId);
        }, this.settings.delayMinutes * 60 * 1000);
      }
    } catch (error) {
      console.error('Error processing email:', error);
    }
  }

  connect(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.connected) return resolve(true);

      this.imap.once('ready', () => {
        this.connected = true;
        resolve(true);
      });

      this.imap.once('error', (err: Error) => {
        console.error('Connection error:', err);
        resolve(false);
      });

      this.imap.connect();
    });
  }

  async checkEmails(): Promise<Email[]> {
    try {
      const isConnected = await this.connect();
      if (!isConnected) throw new Error('Not connected to IMAP server');

      return new Promise((resolve, reject) => {
        this.imap.openBox('INBOX', false, (err: Error | null) => {
          if (err) return reject(err);

          const searchDate = new Date();
          searchDate.setDate(searchDate.getDate() - 7); // Fetch last 7 days for safety
          const searchCriteria = ['UNSEEN', ['SINCE', searchDate.toLocaleDateString('en-US')]];

          this.imap.search(searchCriteria, (err: Error | null, results: number[]) => {
            if (err) return reject(err);
            if (!results || results.length === 0) return resolve([]);

            // Filter out already processed UIDs
            const newResults = results.filter(uid => !this.database.getProcessedEmails().has(uid));
            if (newResults.length === 0) return resolve([]);

            console.log(`Found ${newResults.length} new emails to process`);
            const fetch = this.imap.fetch(newResults, { bodies: '', markSeen: true });
            const emails: Email[] = [];

            fetch.on('message', (msg: Imap.ImapMessage) => {
              let buffer = '';
              let uid: number;

              msg.on('attributes', (attrs: any) => uid = attrs.uid);
              msg.on('body', (stream: NodeJS.ReadableStream) => {
                stream.on('data', (chunk: Buffer) => buffer += chunk.toString('utf8'));
                stream.on('end', async () => {
                  try {
                    const readableStream = new Readable();
                    readableStream.push(buffer);
                    readableStream.push(null);

                    const parsed = await simpleParser(readableStream);

                    const email: Email = {
                      id: `email-${uid}-${Date.now()}`,
                      from: parsed.from?.value?.[0]?.address || '',
                      subject: parsed.subject || 'No Subject',
                      date: ensureDate(parsed.date),
                      text: parsed.text || '',
                      html: parsed.html || '',
                      messageId: parsed.messageId || '',
                      inReplyTo: parsed.inReplyTo,
                      references: Array.isArray(parsed.references)
                        ? parsed.references
                        : parsed.references
                        ? String(parsed.references).split(/\s+/)
                        : [],
                      uid,
                      replied: false,
                      threadId: ''
                    };

                    email.threadId = this.getThreadId(email);
                    emails.push(email);
                    await this.processEmail(email);
                  } catch (parseErr) {
                    console.error('Error parsing email:', parseErr);
                  }
                });
              });
            });

            fetch.once('error', (err: Error) => reject(err));
            fetch.once('end', () => {
              console.log(`Finished processing ${emails.length} emails`);
              resolve(emails);
            });
          });
        });
      });
    } catch (error) {
      console.error('Error checking emails:', error);
      return [];
    }
  }

  async sendAutoReply(to: string, subject: string, text: string, inReplyTo: string | null = null): Promise<boolean> {
    try {
      const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.EMAIL_USER || '',
        to,
        subject: `Re: ${subject}`,
        text,
        inReplyTo: inReplyTo || undefined
      };

      const info = await this.smtpTransport.sendMail(mailOptions);
      console.log(`✅ Auto-reply sent to ${to}, Message ID: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error('❌ Error sending auto-reply:', error);
      return false;
    }
  }

  getSettings(): Settings {
    return this.settings;
  }

  updateSettings(newSettings: Partial<Settings>): void {
    this.settings = { ...this.settings, ...newSettings };
  }

  disconnect(): void {
    if (this.connected) {
      this.imap.end();
      this.connected = false;
    }
  }
}

let emailServiceInstance: EmailService | null = null;
export function getEmailService(): EmailService {
  if (!emailServiceInstance) emailServiceInstance = new EmailService();
  return emailServiceInstance;
}

process.on('SIGINT', () => {
  if (emailServiceInstance) emailServiceInstance.disconnect();
  process.exit(0);
});

process.on('SIGTERM', () => {
  if (emailServiceInstance) emailServiceInstance.disconnect();
  process.exit(0);
});
