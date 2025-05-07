import cron from 'node-cron';

export function startCronJob() {
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
