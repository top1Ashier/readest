/**
 * Build-time capabilities for the independently distributed community edition.
 *
 * Keep these as literals so Next.js can remove disabled official-service code
 * from production bundles. The community edition remains a local-first reader;
 * user-configured WebDAV, S3, Google Drive and OneDrive integrations are not
 * Readest-operated services and stay available.
 */
export const COMMUNITY_EDITION = true;
export const OFFICIAL_ACCOUNTS_ENABLED = false;
export const OFFICIAL_CLOUD_ENABLED = false;
export const OFFICIAL_PAYMENTS_ENABLED = false;
export const TELEMETRY_ENABLED = false;
export const AUTOMATIC_UPDATES_ENABLED = false;
