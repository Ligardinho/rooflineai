export interface Email {
  id: string;
  from: string;
  subject: string;
  date: Date | string; // Allow both Date and string
  text: string;
  html: string;
  messageId: string;
  inReplyTo?: string;
  references?: string[];
  uid: number;
  replied: boolean;
  repliedAt?: Date | string; // Allow both Date and string
  threadId: string;
}

export interface Settings {
  autoReply: boolean;
  delayMinutes: number;
  responseTemplate: string;
}

export interface TestResults {
  imap: boolean | null;
  smtp: boolean | null;
  error?: string;
}

export interface ConnectionResults {
  imap: boolean | null;
  smtp: boolean | null;
  error?: string;
  message?: string;
}

// Helper function to ensure we always get a Date object
export function ensureDate(date: Date | string | undefined): Date {
  if (!date) return new Date();
  return typeof date === 'string' ? new Date(date) : date;
}