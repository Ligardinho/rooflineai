'use client';

import { useState, useEffect } from 'react';
import { FiMail, FiSettings, FiClock, FiCheck, FiRefreshCw, FiMessageSquare, FiUser } from 'react-icons/fi';
import EmailTest from '@/components/EmailTest';

interface Email {
  id: string;
  from: string;
  subject: string;
  date: string;
  text: string;
  html: string;
  messageId: string;
  inReplyTo?: string;
  references?: string[];
  uid: number;
  replied: boolean;
  repliedAt?: string;
  threadId: string;
}

interface Settings {
  autoReply: boolean;
  delayMinutes: number;
  responseTemplate: string;
}

interface ConnectionResults {
  imap: boolean | null;
  smtp: boolean | null;
  error?: string;
  message?: string;
}

// Helper function to ensure consistent date handling
const ensureDate = (date: Date | string | undefined): Date => {
  if (!date) return new Date();
  return typeof date === 'string' ? new Date(date) : date;
};

export default function HomePage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    autoReply: true,
    delayMinutes: 3,
    responseTemplate: "Thank you for your inquiry about our property. Our team will contact you within 24 hours to answer your questions and schedule a viewing. In the meantime, feel free to browse our available listings on our website."
  });
  const [showSettings, setShowSettings] = useState(false);
  const [notification, setNotification] = useState('');
  const [connectionResults, setConnectionResults] = useState<ConnectionResults>({ 
    imap: null, 
    smtp: null 
  });
  const [activeTab, setActiveTab] = useState<'conversations' | 'all-emails'>('conversations');

  // Group emails by conversation thread
  const groupEmailsByConversation = (emails: Email[]) => {
    const conversations: { [threadId: string]: Email[] } = {};
    
    emails.forEach(email => {
      const threadId = email.threadId || `single-${email.id}`;
      if (!conversations[threadId]) {
        conversations[threadId] = [];
      }
      conversations[threadId].push(email);
    });
    
    // Sort each conversation by date (oldest first)
    Object.values(conversations).forEach(conversation => {
      conversation.sort((a, b) => 
        ensureDate(a.date).getTime() - ensureDate(b.date).getTime()
      );
    });
    
    return conversations;
  };

  const emailConversations = groupEmailsByConversation(emails);

  const fetchEmails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/emails');
      const data = await response.json();
      setEmails(data.emails || []);
    } catch (error) {
      console.error('Error fetching emails:', error);
      setNotification('Error fetching emails');
      setTimeout(() => setNotification(''), 3000);
    }
    setIsLoading(false);
  };

  const checkForNewEmails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'check' }),
      });
      const data = await response.json();
      setEmails(data.emails || []);
      
      if (data.newEmails && data.newEmails.length > 0) {
        setNotification(`Found ${data.newEmails.length} new emails`);
      } else {
        setNotification('No new emails found');
      }
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error checking emails:', error);
      setNotification('Error checking emails');
      setTimeout(() => setNotification(''), 3000);
    }
    setIsLoading(false);
  };

  const testConnections = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-connection');
      const data = await response.json();
      setConnectionResults(data);
      
      if (data.imap && data.smtp) {
        setNotification('All connections successful!');
      } else {
        setNotification('Connection test failed');
      }
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Connection test failed:', error);
      setConnectionResults({ imap: false, smtp: false, error: 'Test failed' });
      setNotification('Connection test failed');
      setTimeout(() => setNotification(''), 3000);
    }
    setIsLoading(false);
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setSettings(data.settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const updateSettings = async (newSettings: Settings) => {
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      const data = await response.json();
      setSettings(data.settings);
      setShowSettings(false);
      setNotification('Settings updated successfully');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error updating settings:', error);
      setNotification('Error updating settings');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  useEffect(() => {
    fetchEmails();
    fetchSettings();
    testConnections();

    // Set up interval to check for new emails every 60 seconds
    const interval = setInterval(() => {
      fetchEmails();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {notification && (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-md">
            <p className="font-medium">{notification}</p>
          </div>
        )}

        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <FiMail className="mr-3 text-indigo-600" />
            Realtor Email Assistant
          </h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center bg-white text-indigo-600 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <FiSettings className="mr-2" />
            Settings
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Stats Panel */}
          <div className="bg-white p-5 rounded-xl shadow-sm lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Email Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-600 text-sm">Total Emails</span>
                <span className="font-bold text-blue-600">{emails.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-600 text-sm">Replied</span>
                <span className="font-bold text-green-600">
                  {emails.filter(e => e.replied).length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                <span className="text-gray-600 text-sm">Conversations</span>
                <span className="font-bold text-amber-600">
                  {Object.keys(emailConversations).length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-600 text-sm">Pending Replies</span>
                <span className="font-bold text-purple-600">
                  {emails.filter(e => !e.replied && !e.from.includes('@gmail.com')).length}
                </span>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <button
                onClick={testConnections}
                disabled={isLoading}
                className="w-full bg-green-500 text-white py-2 rounded-lg font-medium flex items-center justify-center hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <FiRefreshCw className="animate-spin mr-2" />
                ) : (
                  <FiCheck className="mr-2" />
                )}
                Test Connections
              </button>
              
              <button
                onClick={checkForNewEmails}
                disabled={isLoading}
                className="w-full bg-indigo-500 text-white py-2 rounded-lg font-medium flex items-center justify-center hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <FiRefreshCw className="animate-spin mr-2" />
                ) : (
                  <FiRefreshCw className="mr-2" />
                )}
                Check Emails
              </button>
            </div>

            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-sm">Connection Status</h3>
              <div className="flex items-center mb-1">
                <span className={`w-2 h-2 rounded-full mr-2 ${connectionResults.imap ? 'bg-green-400' : 'bg-red-400'}`}></span>
                <span className="text-sm">IMAP: {connectionResults.imap ? 'Connected' : 'Disconnected'}</span>
              </div>
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${connectionResults.smtp ? 'bg-green-400' : 'bg-red-400'}`}></span>
                <span className="text-sm">SMTP: {connectionResults.smtp ? 'Connected' : 'Disconnected'}</span>
              </div>
            </div>
          </div>

          {/* Email List */}
          <div className="bg-white p-5 rounded-xl shadow-sm lg:col-span-3">
            <div className="flex border-b border-gray-200 mb-4">
              <button
                className={`px-4 py-2 font-medium flex items-center text-sm ${activeTab === 'conversations' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('conversations')}
              >
                <FiMessageSquare className="mr-2" />
                Conversations ({Object.keys(emailConversations).length})
              </button>
              <button
                className={`px-4 py-2 font-medium flex items-center text-sm ${activeTab === 'all-emails' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('all-emails')}
              >
                <FiMail className="mr-2" />
                All Emails ({emails.length})
              </button>
            </div>
            
            {isLoading && emails.length === 0 ? (
              <div className="flex justify-center items-center h-40">
                <FiRefreshCw className="animate-spin text-indigo-600 text-2xl" />
                <span className="ml-2 text-gray-500">Loading emails...</span>
              </div>
            ) : emails.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <FiMail className="text-4xl mx-auto mb-3 opacity-50" />
                <p className="text-sm">No emails found. Check for new emails to get started.</p>
              </div>
            ) : activeTab === 'conversations' ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {Object.entries(emailConversations).map(([threadId, conversation]) => (
                  <div key={threadId} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-sm">
                      <FiMessageSquare className="mr-2 text-indigo-500" />
                      Conversation with {conversation[0].from.replace(/@.*$/, '')}
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        ({conversation.length} messages)
                      </span>
                    </h3>
                    
                    <div className="space-y-2">
                      {conversation.map((email) => (
                        <div key={email.id} className={`p-3 rounded-lg border-l-4 ${
                          email.from.includes('@gmail.com') 
                            ? 'bg-blue-50 border-blue-400' 
                            : 'bg-gray-50 border-gray-400'
                        }`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-xs flex items-center">
                              <FiUser className="mr-1" />
                              {email.from.includes('@gmail.com') ? 'You' : email.from.replace(/@.*$/, '')}
                            </span>
                            <span className="text-xs text-gray-500">
                              {ensureDate(email.date).toLocaleDateString()} at {ensureDate(email.date).toLocaleTimeString()}
                            </span>
                          </div>
                          
                          <p className="text-gray-700 text-xs mb-2 line-clamp-2">
                            {email.text?.substring(0, 120) || 'No content available'}
                            {email.text && email.text.length > 120 ? '...' : ''}
                          </p>
                          
                          <div className="flex justify-between items-center">
                            <span className={`inline-flex items-center text-xs px-2 py-1 rounded ${
                              email.replied ? 'bg-green-100 text-green-800' : 
                              email.from.includes('@gmail.com') ? 'bg-blue-100 text-blue-800' : 
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {email.replied ? (
                                <><FiCheck className="mr-1" /> Replied</>
                              ) : email.from.includes('@gmail.com') ? (
                                <><FiCheck className="mr-1" /> Sent</>
                              ) : (
                                <><FiClock className="mr-1" /> Needs reply</>
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {emails.map((email) => (
                  <div key={email.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800 text-sm">{email.subject}</h3>
                      <span className="text-xs text-gray-500">
                        {ensureDate(email.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2 text-xs">From: {email.from}</p>
                    <p className="text-gray-700 mb-3 text-xs line-clamp-2">
                      {email.text?.substring(0, 100) || 'No content available'}
                      {email.text && email.text.length > 100 ? '...' : ''}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className={`inline-flex items-center text-xs px-2 py-1 rounded ${
                        email.replied ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {email.replied ? (
                          <>
                            <FiCheck className="mr-1" /> Replied
                          </>
                        ) : (
                          <>
                            <FiClock className="mr-1" /> Pending
                          </>
                        )}
                      </span>
                      {email.replied && email.repliedAt && (
                        <span className="text-xs text-gray-500">
                          {ensureDate(email.repliedAt).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <EmailTest />
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FiSettings className="mr-2" />
                Auto-Reply Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.autoReply}
                      onChange={(e) => setSettings({...settings, autoReply: e.target.checked})}
                      className="mr-2 h-5 w-5 text-indigo-600 rounded"
                    />
                    Enable Auto-Reply
                  </label>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium">Response Delay (minutes)</label>
                  <input
                    type="number"
                    value={settings.delayMinutes}
                    onChange={(e) => setSettings({...settings, delayMinutes: parseInt(e.target.value) || 3})}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    min="1"
                    max="60"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium">Response Template</label>
                  <textarea
                    value={settings.responseTemplate}
                    onChange={(e) => setSettings({...settings, responseTemplate: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded text-sm h-32"
                    placeholder="Enter your response template"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateSettings(settings)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}