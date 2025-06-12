'use client';

import { useEffect } from 'react';

/**
 * A component that periodically pings the keep-alive endpoint to prevent Supabase from
 * pausing the project due to inactivity.
 */
export default function KeepAlive() {
  useEffect(() => {
    // Function to ping the keep-alive endpoint
    const pingKeepAlive = async () => {
      try {
        const response = await fetch('/api/keep-alive');
        if (!response.ok) {
          console.warn('Keep-alive ping failed:', await response.text());
        } else {
          console.log('Keep-alive ping successful');
        }
      } catch (error) {
        console.error('Error during keep-alive ping:', error);
      }
    };

    // Ping immediately on mount
    pingKeepAlive();

    // Set up interval to ping every 12 hours (43200000 ms)
    // This is much more efficient than every 5 minutes in the original code
    const intervalId = setInterval(pingKeepAlive, 43200000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // This component doesn't render anything
  return null;
}

