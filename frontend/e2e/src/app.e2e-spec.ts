import { browser, logging } from 'protractor';

describe('ShortLink app', () => {
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('should render ShortLink as title', async () => {
    await browser.get(browser.baseUrl);
    const title = await browser.getTitle();
    expect(title).toBe('ShortLink');
  });
});
