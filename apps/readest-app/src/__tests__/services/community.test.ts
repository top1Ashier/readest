import { describe, expect, test } from 'vitest';

import {
  COMMUNITY_EDITION,
  OFFICIAL_ACCOUNTS_ENABLED,
  OFFICIAL_CLOUD_ENABLED,
  OFFICIAL_PAYMENTS_ENABLED,
  TELEMETRY_ENABLED,
  AUTOMATIC_UPDATES_ENABLED,
} from '@/services/community';

describe('community edition capabilities', () => {
  test('keeps official Readest services disabled at build time', () => {
    expect(COMMUNITY_EDITION).toBe(true);
    expect(OFFICIAL_ACCOUNTS_ENABLED).toBe(false);
    expect(OFFICIAL_CLOUD_ENABLED).toBe(false);
    expect(OFFICIAL_PAYMENTS_ENABLED).toBe(false);
    expect(TELEMETRY_ENABLED).toBe(false);
    expect(AUTOMATIC_UPDATES_ENABLED).toBe(false);
  });
});
