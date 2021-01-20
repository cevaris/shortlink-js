import { browser, by, element } from 'protractor';
import { expectNoErrors } from './utils';

describe('/links create', () => {
  afterEach(async () => {
    await expectNoErrors();
  });

  it('should create a ShortLink', async () => {
    await browser.get(`${browser.baseUrl}/links`);

    const nowMs = new Date().getTime();
    const longLink = `https://www.epochconverter.com/timezones?q=${nowMs}&tz=UTC`;

    const linkInputField = element(by.id('link'));
    await linkInputField.sendKeys(longLink);

    const linkCreateButton = element(by.buttonText('Shorten'));
    await linkCreateButton.click();

    // expect short link to be present
    const shortLinkAnchor = element(by.className('short-link'));
    expect(shortLinkAnchor.getText()).toBeTruthy();

    // expect original long link to be present
    const longLinkAnchor = element(by.className('long-link'));
    expect(longLinkAnchor.getText()).toBe(longLink);
  });
});
