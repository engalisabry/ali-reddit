'use client';

import { toast } from 'sonner';
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
          toast.warning(`Keep-alive ping failed: ${await response.text()}`);
        } else {
          toast.success('Keep-alive ping successful');
        }
      } catch (error) {
        toast.error(`Error during keep-alive ping: ${error}`);
      }
    };

    pingKeepAlive();

    const intervalId = setInterval(pingKeepAlive, 43200000);

    return () => clearInterval(intervalId);
  }, []);

  return null;
}
