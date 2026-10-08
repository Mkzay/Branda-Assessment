import { describe, expect, it } from 'vitest';
import { recoveryLink } from './recovery';
describe('market-aware recovery', () => {
  it.each(['ng', 'us', 'uk', 'ca'])(
    'preserves %s on failed and unknown routes',
    (market) => {
      expect(recoveryLink(`/${market}/services/missing`)).toBe(
        `/${market}/services`,
      );
      expect(recoveryLink(`/${market}/unknown`)).toBe(`/${market}/services`);
    },
  );
  it.each([
    '/au/services',
    '/constructor/services',
    '/toString/services',
    '/missing',
  ])('uses the home route for invalid markets: %s', (path) => {
    expect(recoveryLink(path)).toBe('/');
  });
});
