import { browser, by, element } from 'protractor';
import { expectNoErrors } from './utils';

describe('ShortLinks', () => {
  afterEach(async () => {
    await browser.waitForAngularEnabled(true);
  });

  it('should should redirect to long link', async () => {
    await browser.get(`${browser.baseUrl}/links`);

    const nowMs = new Date().getTime();
    const longLink = `https://www.epochconverter.com/timezones?q=${nowMs}&tz=UTC`;

    const linkInputField = element(by.id('link'));
    await linkInputField.sendKeys(longLink);

    const linkCreateButton = element(by.buttonText('Shorten'));
    await linkCreateButton.click();

    await expectNoErrors();

    const shortLinkAnchor = element(by.className('short-link'));
    const shortLink = await shortLinkAnchor.getText();

    // need to disable angular check to navigate to non-angular link
    await browser.waitForAngularEnabled(false);
    await browser.get(shortLink);

    const title = await browser.getTitle();
    expect(title).toContain(`${nowMs}`);
  });
});
