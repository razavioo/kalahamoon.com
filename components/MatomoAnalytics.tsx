'use client';

import { Suspense, useEffect, useMemo } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

type MatomoCommand = Array<string | number | boolean | null | undefined>;

declare global {
  interface Window {
    _paq?: MatomoCommand[];
  }
}

function isMatomoConfigured() {
  return (
    process.env.NEXT_PUBLIC_MATOMO_ENABLED === 'true' &&
    Boolean(process.env.NEXT_PUBLIC_MATOMO_URL) &&
    Boolean(process.env.NEXT_PUBLIC_MATOMO_SITE_ID)
  );
}

function getMatomoBaseUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_MATOMO_URL || '';
  return rawUrl.endsWith('/') ? rawUrl : `${rawUrl}/`;
}

function sanitizeEventName(value: string | null | undefined) {
  return value?.replace(/\s+/g, ' ').trim().slice(0, 96) || 'unknown';
}

function getElementName(element: HTMLElement) {
  return sanitizeEventName(
    element.dataset.matomoName ||
      element.getAttribute('aria-label') ||
      element.getAttribute('title') ||
      element.textContent ||
      element.getAttribute('href'),
  );
}

function MatomoRuntime() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const enabled = isMatomoConfigured();
  const siteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;
  const matomoBaseUrl = useMemo(() => getMatomoBaseUrl(), []);
  const queryString = searchParams?.toString();

  useEffect(() => {
    if (!enabled || !siteId) return;

    window._paq = window._paq || [];
    window._paq.push(['setTrackerUrl', `${matomoBaseUrl}matomo.php`]);
    window._paq.push(['setSiteId', siteId]);
    window._paq.push(['enableLinkTracking']);
  }, [enabled, matomoBaseUrl, siteId]);

  useEffect(() => {
    if (!enabled || !pathname) return;

    const publicUrl = `${window.location.origin}${pathname}${queryString ? `?${queryString}` : ''}`;

    window._paq = window._paq || [];
    window._paq.push(['setCustomUrl', publicUrl]);
    window._paq.push(['setDocumentTitle', document.title]);
    window._paq.push(['trackPageView']);
  }, [enabled, pathname, queryString]);

  useEffect(() => {
    if (!enabled) return;

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const element = target.closest<HTMLElement>(
        '[data-matomo-event],button,a,[role="button"],input[type="submit"]',
      );
      if (!element) return;

      const tagName = element.tagName.toLowerCase();
      const category = element.dataset.matomoCategory || 'public_click';
      const action =
        element.dataset.matomoAction ||
        element.dataset.matomoEvent ||
        (tagName === 'a' ? 'link_click' : 'button_click');
      const name = getElementName(element);

      window._paq = window._paq || [];
      window._paq.push(['trackEvent', category, sanitizeEventName(action), name]);
    }

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [enabled]);

  if (!enabled) return null;

  return <Script id="matomo-script" src={`${matomoBaseUrl}matomo.js`} strategy="afterInteractive" />;
}

export default function MatomoAnalytics() {
  return (
    <Suspense fallback={null}>
      <MatomoRuntime />
    </Suspense>
  );
}
