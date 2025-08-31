'use client';

import { useEffect } from 'react';
import { getEmailService } from '@/lib/emailService';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const emailService = getEmailService();
    
    // Test connections on startup
    const testConnections = async () => {
      try {
        const imapConnected = await emailService.connect();
        console.log('IMAP connection:', imapConnected ? '✅ Success' : '❌ Failed');
        
        try {
          const smtpVerified = await emailService.smtpTransport.verify();
          console.log('SMTP connection:', smtpVerified ? '✅ Success' : '❌ Failed');
        } catch (smtpError) {
          console.log('SMTP connection: ❌ Failed');
        }
        
        // Disconnect after test
        emailService.disconnect();
      } catch (error) {
        console.error('Connection test failed:', error);
      }
    };
    
    testConnections();

    // Set up interval to check for new emails every 60 seconds
    const interval = setInterval(async () => {
      try {
        const emails = await emailService.checkEmails();
        if (emails.length > 0) {
          console.log(`Found ${emails.length} new emails`);
          
          // Process emails with auto-reply if enabled
          if (emailService.getSettings().autoReply) {
            for (const email of emails) {
              setTimeout(() => {
                emailService.sendAutoReply(
                  email.from,
                  email.subject,
                  emailService.getSettings().responseTemplate,
                  email.messageId
                );
              }, emailService.getSettings().delayMinutes * 60 * 1000);
            }
          }
        }
      } catch (error) {
        console.error('Error checking emails:', error);
      }
    }, 60000); // Check every 60 seconds

    return () => {
      clearInterval(interval);
      emailService.disconnect();
    };
  }, []);

  return <>{children}</>;
}