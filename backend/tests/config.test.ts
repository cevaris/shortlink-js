import { Config } from "../src/config";

const originalEnv = process.env;

let config: Config;

afterEach(() => {
    // revert any process env changes
    process.env = originalEnv;
});

test('correctly detects production env', () => {
    process.env.NODE_ENV = 'production';
    config = new Config();
    expect(config.isProduction).toBe(true);
});

test('correctly detects non-production env', () => {
    process.env.NODE_ENV = 'test';
    config = new Config();
    expect(config.isProduction).toBe(false);

    // casing is incorrect
    process.env.NODE_ENV = 'PRODUCTION';
    config = new Config();
    expect(config.isProduction).toBe(false);
});


test('correctly detects frontEndDomain', () => {
    const value = 'http://frontend.com';

    process.env.FRONTEND_DOMAIN = value;
    config = new Config();
    expect(config.frontendDomain).toBe(value);
});

test('correctly falls back to localhost', () => {
    delete process.env.FRONTEND_DOMAIN;
    config = new Config();
    expect(config.frontendDomain).toBe('http://localhost:4200');
});
