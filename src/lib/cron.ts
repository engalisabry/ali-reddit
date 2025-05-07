import cron from 'node-cron';

export function startCronJob() {
  // Schedule a task to run every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    try {
      const response = await fetch('/api/keep-alive');
      if (!response.ok) {
        console.error('Failed to ping Supabase');
      }
    } catch (error) {
      console.error('Error pinging Supabase:', error);
    }
  });
}
