import { browser, by, element, ElementFinder } from 'protractor';
import { expectNoErrors } from './utils';

describe('/', () => {
  afterEach(async () => {
    await expectNoErrors();
  });

  it('should create a ShortLink and render on home page', async () => {
    await browser.get(`${browser.baseUrl}/links`);

    const nowMs = new Date().getTime();
    const longLink = `https://www.epochconverter.com/timezones?q=${nowMs}&tz=UTC`;

    const linkInputField = element(by.id('link'));
    await linkInputField.sendKeys(longLink);

    const linkCreateButton = element(by.buttonText('Shorten'));
    await linkCreateButton.click();

    // navigate back to home page to search for the newly created link
    await browser.get(`${browser.baseUrl}`);

    // expect original long link to be present
    const longLinkAnchors: ElementFinder[] = await element.all(by.className('long-link'));
    const longLinkAnchor = longLinkAnchors.find(async (e) => await e.getText() === longLink);

    expect(longLinkAnchor).toBeTruthy();
  });
});
