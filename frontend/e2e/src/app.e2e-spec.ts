import { browser, by, element } from 'protractor';
import { expectNoErrors } from './utils';

describe('App', () => {
  afterEach(async () => {
    await expectNoErrors();
  });

  it('should render ShortLink as title', async () => {
    await browser.get(browser.baseUrl);
    const title = await browser.getTitle();
    expect(title).toBe('ShortLink');
  });

  it('should render Snackbar if page not found ', async () => {
    await browser.get(`${browser.baseUrl}/pageDoesNotExist`);

    const snackbarSpan = element(by.tagName('simple-snack-bar span'));
    const snackBarMessage = snackbarSpan.getText();
    expect(snackBarMessage).toBe('Page not found.');
  });
});
