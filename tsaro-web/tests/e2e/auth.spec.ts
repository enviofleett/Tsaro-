import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('logged-out user cannot access /admin', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('authenticated non-admin cannot access /admin', async ({ page }) => {
    // Assuming a way to mock non-admin login or relying on seeded data
    test.skip(true, 'Requires seeded non-admin user');
  });

  test('admin can access /admin', async ({ page }) => {
    test.skip(true, 'Requires seeded admin user');
  });
});
