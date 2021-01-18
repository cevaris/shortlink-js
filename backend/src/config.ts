export class Config {
    readonly isProduction: boolean
    readonly frontendDomain: string

    constructor() {
        this.isProduction = process.env.NODE_ENV?.toString() === 'production';
        this.frontendDomain = process.env.FRONTEND_DOMAIN?.toString() ||
            'http://localhost:4200';
    }
}

export const config = new Config();