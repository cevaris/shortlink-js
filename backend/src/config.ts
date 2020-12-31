class Config {
    readonly isProduction: boolean

    constructor() {
        this.isProduction = process.env.NODE_ENV?.toString() === 'production';
    }
}

export const config = new Config();