import { useEffect, useRef, useCallback } from 'react';
import { API_URL } from '@/services/api';

interface TrackOptions {
  type: 'page_view' | 'project_view' | 'demo_click' | 'github_click' | 'contact_submit';
  resourceId?: string;
  resourceSlug?: string;
  resourceTitle?: string;
  path?: string;
}

// Lightweight session ID (per tab)
const SESSION_ID = Math.random().toString(36).substring(2);

export const trackEvent = async (options: TrackOptions) => {
  try {
    await fetch(`${API_URL}/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': SESSION_ID
      },
      body: JSON.stringify({ ...options, path: options.path || window.location.pathname })
    });
  } catch {
    // Silently fail — analytics must never block UX
  }
};

/**
 * Hook: automatically track a page view when a component mounts.
 */
export const usePageView = (path?: string) => {
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      trackEvent({ type: 'page_view', path: path || window.location.pathname });
    }
  }, [path]);
};

/**
 * Hook: returns a memoized tracker function for click events (demo, github, etc.)
 */
export const useClickTracker = () => {
  return useCallback((
    type: 'demo_click' | 'github_click',
    resourceId: string,
    resourceTitle: string
  ) => {
    trackEvent({ type, resourceId, resourceTitle });
  }, []);
};
