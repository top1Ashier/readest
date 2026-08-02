import { render, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

const replace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace }),
}));

import OfficialAccountsDisabled from '@/app/auth/OfficialAccountsDisabled';

describe('OfficialAccountsDisabled', () => {
  test('redirects legacy account routes back to the local library', async () => {
    render(<OfficialAccountsDisabled />);
    await waitFor(() => expect(replace).toHaveBeenCalledWith('/library'));
  });
});
