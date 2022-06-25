import { detect } from 'detect-browser';

export const customBrowserDetect = (): string => {
  const browser = detect();
  switch (browser && browser.name) {
    case 'chrome':
      if (navigator?.brave) {
        return 'brave';
      }
      return 'chrome';
    case 'firefox':
      return 'firefox';
    case 'edge-chromium':
      return 'edge-chromium';
    default:
      return 'unknown';
  }
};
