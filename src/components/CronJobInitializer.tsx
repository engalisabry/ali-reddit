'use client';

import { useEffect } from 'react';
import { startCronJob } from '../lib/cron';

export function CronJobInitializer() {
  useEffect(() => {
    startCronJob();
  }, []);

  return null;
}
