'use client';

import React from 'react';
import { registerOfflineServiceWorker } from '@/src/lib/offlineStorage';

export function ServiceWorkerRegister() {
  React.useEffect(() => {
    registerOfflineServiceWorker();
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.active) {
          try {
            registration.active.postMessage({ type: 'ENSURE_SHELL' });
          } catch {
            // Best effort background shell verification
          }
        }
      }).catch(() => {});
    }
  }, []);

  return null;
}
