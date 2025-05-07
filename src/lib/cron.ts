import cron from 'node-cron';

export function startCronJob() {
  // Schedule a task to run every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    try {
      const response = await fetch('/api/keep-alive');
      if (!response.ok) {
        alert('Failed to ping Supabase');
      }
    } catch (error) {
      alert('Error pinging Supabase');
    }
  });
}
