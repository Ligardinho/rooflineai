import { NextRequest, NextResponse } from 'next/server';
import { getEmailService } from '@/lib/emailService';
import { getEmailDatabase } from '@/lib/emailDatabase';
import { ensureDate } from '@/lib/types';

export async function GET() {
  try {
    const database = getEmailDatabase();
    const conversations = Array.from(database.getAllConversations().values());
    const allEmails = database.getAllEmails();
    
    // Convert dates to strings for JSON response
    const emailsForResponse = allEmails.map(email => ({
      ...email,
      date: ensureDate(email.date).toISOString(),
      repliedAt: email.repliedAt ? ensureDate(email.repliedAt).toISOString() : undefined
    }));
    
    return NextResponse.json({ 
      emails: emailsForResponse,
      conversations: conversations.length
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const emailService = getEmailService();
    const database = getEmailDatabase();
    const body = await request.json();
    const { action } = body;
    
    if (action === 'check') {
      const newEmails = await emailService.checkEmails();
      
      // Add emails to database - they will be converted to proper Date objects there
      newEmails.forEach(email => database.addEmail(email));

      // Get all emails for response (with string dates)
      const allEmails = database.getAllEmails().map(email => ({
        ...email,
        date: ensureDate(email.date).toISOString(),
        repliedAt: email.repliedAt ? ensureDate(email.repliedAt).toISOString() : undefined
      }));

      return NextResponse.json({ 
        message: `Found ${newEmails.length} new emails`, 
        newEmails: allEmails.filter(email => 
          ensureDate(email.date).getTime() > Date.now() - 60000 // Emails from last minute
        ),
        totalEmails: allEmails.length,
        totalConversations: database.getAllConversations().size
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process email request' },
      { status: 500 }
    );
  }
}