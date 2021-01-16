import { expect, test } from '@jest/globals';
import { isValidLink } from '../../src/http/validLink';

test('expect valid link return true', () => {
    expect(isValidLink('https://google.com')).toBe(true);
    expect(isValidLink('http://google.com')).toBe(true);
    expect(isValidLink('http://google.com:4200')).toBe(true);
    expect(isValidLink('ftp://google.com')).toBe(true);

    expect(isValidLink('https://google.org')).toBe(true);
});

test('expect invalid links to fail', () => {
    expect(isValidLink('')).toBe(false);
    // current logic rejects localhost links
    expect(isValidLink('http://localhost:8000')).toBe(false);

    // missing/invalid protocol
    expect(isValidLink('google.com')).toBe(false);
    expect(isValidLink('ssh://google.com')).toBe(false);

    // missing top level domain
    expect(isValidLink('https://google')).toBe(false);
});
