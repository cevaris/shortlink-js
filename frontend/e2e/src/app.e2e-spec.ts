import { browser } from 'protractor';
import { expectNoErrors } from './utils';

describe('ShortLink app', () => {
  afterEach(async () => {
    await expectNoErrors();
  });

  it('should render ShortLink as title', async () => {
    await browser.get(browser.baseUrl);
    const title = await browser.getTitle();
    expect(title).toBe('ShortLink');
  });
});
