'use client';

import { useState } from 'react';
import { FiCheck, FiX, FiMail } from 'react-icons/fi';

interface TestResults {
  imap: boolean | null;
  smtp: boolean | null;
  error?: string;
}

export default function EmailTest() {
  const [testing, setTesting] = useState<boolean>(false);
  const [results, setResults] = useState<TestResults>({ imap: null, smtp: null });

  const testConnection = async (): Promise<void> => {
    setTesting(true);
    try {
      const response = await fetch('/api/test-connection');
      const data: TestResults = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Test failed:', error);
      setResults({ 
        imap: false, 
        smtp: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      });
    }
    setTesting(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FiMail className="mr-2" />
        Test Email Connection
      </h2>
      
      <button
        onClick={testConnection}
        disabled={testing}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 mb-4"
      >
        {testing ? 'Testing...' : 'Test Connection'}
      </button>

      {results.imap !== null && (
        <div className="space-y-3">
          <div className="flex items-center">
            {results.imap ? (
              <FiCheck className="text-green-500 mr-2" />
            ) : (
              <FiX className="text-red-500 mr-2" />
            )}
            <span>IMAP Connection: {results.imap ? 'Success' : 'Failed'}</span>
          </div>
          
          <div className="flex items-center">
            {results.smtp ? (
              <FiCheck className="text-green-500 mr-2" />
            ) : (
              <FiX className="text-red-500 mr-2" />
            )}
            <span>SMTP Connection: {results.smtp ? 'Success' : 'Failed'}</span>
          </div>

          {results.error && (
            <div className="text-red-500 text-sm mt-2">
              Error: {results.error}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium">Troubleshooting tips:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Ensure IMAP is enabled in Gmail settings</li>
          <li>Verify you're using an App Password, not your regular password</li>
          <li>Check that 2-Step Verification is enabled</li>
          <li>Make sure your email address is correctly formatted</li>
        </ul>
      </div>
    </div>
  );
}