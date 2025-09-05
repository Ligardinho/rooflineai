import { Email, ensureDate } from './types';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'emails.json');
const PROCESSED_PATH = path.join(process.cwd(), 'data', 'processedEmails.json');

export class EmailDatabase {
  private emails: Email[] = [];
  private conversations: Map<string, Email[]> = new Map();
  private processedEmails: Set<number> = new Set();

  constructor() {
    this.loadFromDisk();
    this.loadProcessedEmails();
  }

  private loadFromDisk(): void {
    try {
      if (fs.existsSync(DB_PATH)) {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        const parsedData = JSON.parse(data);

        this.emails = parsedData.map((email: any) => ({
          ...email,
          date: new Date(email.date),
          repliedAt: email.repliedAt ? new Date(email.repliedAt) : undefined
        }));

        this.buildConversationIndex();
      }
    } catch (error) {
      console.error('Error loading email database:', error);
      this.emails = [];
    }
  }

  private saveToDisk(): void {
    try {
      const dir = path.dirname(DB_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const emailsForStorage = this.emails.map(email => ({
        ...email,
        date: email.date.toString(),
        repliedAt: email.repliedAt ? email.repliedAt.toString() : undefined
      }));

      fs.writeFileSync(DB_PATH, JSON.stringify(emailsForStorage, null, 2));
    } catch (error) {
      console.error('Error saving email database:', error);
    }
  }

  private loadProcessedEmails(): void {
    try {
      if (fs.existsSync(PROCESSED_PATH)) {
        const data = fs.readFileSync(PROCESSED_PATH, 'utf8');
        const parsed = JSON.parse(data);
        this.processedEmails = new Set(parsed);
      }
    } catch (error) {
      console.error('Error loading processed emails:', error);
      this.processedEmails = new Set();
    }
  }

  private saveProcessedEmails(): void {
    try {
      const dir = path.dirname(PROCESSED_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      fs.writeFileSync(PROCESSED_PATH, JSON.stringify(Array.from(this.processedEmails)), 'utf8');
    } catch (error) {
      console.error('Error saving processed emails:', error);
    }
  }

  private buildConversationIndex(): void {
    this.conversations.clear();
    const threads: Map<string, Email[]> = new Map();

    this.emails.forEach(email => {
      const threadId = email.threadId || this.generateThreadId(email);
      if (!threads.has(threadId)) threads.set(threadId, []);
      threads.get(threadId)!.push(email);
    });

    threads.forEach((emails, threadId) => {
      emails.sort((a, b) => ensureDate(a.date).getTime() - ensureDate(b.date).getTime());
      this.conversations.set(threadId, emails);
    });
  }

  private generateThreadId(email: Email): string {
    const cleanSubject = email.subject.replace(/^(Re:?|Fwd:?)\s*/i, '').trim();
    const fromDomain = email.from.split('@')[1] || '';
    return `thread-${cleanSubject}-${fromDomain}-${Math.random().toString(36).substr(2, 8)}`;
  }

  addEmail(email: Email): void {
    const processedEmail: Email = {
      ...email,
      date: ensureDate(email.date),
      repliedAt: email.repliedAt ? ensureDate(email.repliedAt) : undefined
    };

    if (!processedEmail.threadId) {
      processedEmail.threadId = this.generateThreadId(processedEmail);
    }

    const existingIndex = this.emails.findIndex(
      e => e.messageId === processedEmail.messageId || (e.uid === processedEmail.uid && e.from === processedEmail.from)
    );

    if (existingIndex === -1) {
      this.emails.push(processedEmail);
    } else {
      this.emails[existingIndex] = processedEmail;
    }

    if (!this.processedEmails.has(email.uid)) {
      this.processedEmails.add(email.uid);
      this.saveProcessedEmails();
    }

    this.buildConversationIndex();
    this.saveToDisk();
  }

  getConversation(threadId: string): Email[] {
    return this.conversations.get(threadId) || [];
  }

  getAllConversations(): Map<string, Email[]> {
    return this.conversations;
  }

  getAllEmails(): Email[] {
    return this.emails;
  }

  getEmailByMessageId(messageId: string): Email | undefined {
    return this.emails.find(email => email.messageId === messageId);
  }

  markAsReplied(messageId: string): void {
    const email = this.getEmailByMessageId(messageId);
    if (email) {
      email.replied = true;
      email.repliedAt = new Date();
      this.addEmail(email);
    }
  }

  getEmailsNeedingReply(): Email[] {
    const ourEmail = process.env.EMAIL_USER || '';
    return this.emails.filter(email => !email.replied && !email.from.includes(ourEmail));
  }

  getProcessedEmails(): Set<number> {
    return this.processedEmails;
  }
}

// Singleton
let emailDatabaseInstance: EmailDatabase | null = null;
export function getEmailDatabase(): EmailDatabase {
  if (!emailDatabaseInstance) emailDatabaseInstance = new EmailDatabase();
  return emailDatabaseInstance;
}
