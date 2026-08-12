'use client';

import { useEffect } from 'react';
import { updateTimeSpent, trackClick } from '@/lib/analyticsStore';

export default function AnalyticsTracker() {
  useEffect(() => {
    // Time accumulator — every 30s instead of 5s to reduce localStorage write thrash
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        updateTimeSpent(30);
      }
    }, 30000);

    // Single delegated click handler — passive listener
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest('[data-track-id]') as HTMLElement | null;
      if (!el) return;
      const trackId = el.getAttribute('data-track-id');
      const trackLabel = el.getAttribute('data-track-label') || trackId;
      const category = (el.getAttribute('data-track-category') || 'cta') as any;
      if (trackId) trackClick(trackId, trackLabel || undefined, category);
    };

    window.addEventListener('click', handleGlobalClick, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return null;
}
