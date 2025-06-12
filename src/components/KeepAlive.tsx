'use client';

import { toast } from 'sonner';
import { useEffect } from 'react';

/**
 * A component that periodically pings the keep-alive endpoint to prevent Supabase from
 * pausing the project due to inactivity.
 */
export default function KeepAlive() {
  useEffect(() => {
    const pingKeepAlive = async () => {
      try {
        await fetch('/api/keep-alive');
        return;
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
