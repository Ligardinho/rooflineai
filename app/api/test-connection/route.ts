import { NextResponse } from 'next/server';
import { getEmailService } from '@/lib/emailService';

export async function GET() {
  try {
    const emailService = getEmailService();
    
    // Test IMAP connection
    const imapTest = await new Promise<boolean>(async (resolve) => {
      try {
        const connected = await emailService.connect();
        resolve(connected);
        
        // Disconnect after test
        setTimeout(() => {
          emailService.disconnect();
        }, 1000);
      } catch (error) {
        resolve(false);
      }
    });

    // Test SMTP connection
    let smtpTest = false;
    try {
      smtpTest = await emailService.smtpTransport.verify();
    } catch (error) {
      smtpTest = false;
    }

    return NextResponse.json({ 
      imap: imapTest, 
      smtp: smtpTest,
      message: imapTest && smtpTest ? 
        'Both connections successful!' : 
        'One or more connections failed' 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        imap: false, 
        smtp: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Connection test failed'
      },
      { status: 500 }
    );
  }
}