'use client';

import { ReactNode } from 'react';

/** Community builds do not initialize or contact Readest's telemetry service. */
export const CSPostHogProvider = ({ children }: { children: ReactNode }) => children;
