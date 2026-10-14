import { test, expect } from '@playwright/test';

test.describe('Security', () => {
  test('unauthorized server actions fail', async () => { test.skip(); });
  test('RLS prevents unauthorized modification', async () => { test.skip(); });
  test('unsafe HTML does not execute', async () => { test.skip(); });
});
