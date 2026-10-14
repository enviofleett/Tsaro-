import { test, expect } from '@playwright/test';

test.describe('Pages', () => {
  test('create page', async () => { test.skip(); });
  test('unique slug', async () => { test.skip(); });
  test('edit page', async () => { test.skip(); });
  test('draft page inaccessible publicly', async ({ request }) => {
    const response = await request.get('/some-draft-slug');
    expect(response.status()).toBe(404);
  });
  test('publish page', async () => { test.skip(); });
  test('published page works', async () => { test.skip(); });
  test('archive/unpublish works', async () => { test.skip(); });
});
