'use client';

import React from 'react';
import { registerOfflineServiceWorker } from '@/src/lib/offlineStorage';

export function ServiceWorkerRegister() {
  React.useEffect(() => {
    registerOfflineServiceWorker();
  }, []);

  return null;
}
