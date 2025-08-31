import { NextRequest, NextResponse } from 'next/server';
import { getEmailService } from '@/lib/emailService';

export async function GET() {
  try {
    const emailService = getEmailService();
    const settings = emailService.getSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const emailService = getEmailService();
    const newSettings = await request.json();
    emailService.updateSettings(newSettings);
    
    return NextResponse.json({ 
      settings: emailService.getSettings(),
      message: 'Settings updated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}