import util from 'util';

export enum LogLevel {
    ERROR = 0,
    INFO = 1,
    DEBUG = 2,
}
export let logLevel = LogLevel.INFO;
export function setLogLevel(_logLevel: LogLevel): void {
    logLevel = _logLevel;
}

interface Logger {
    info(...message: any): void
    debug(...message: any): void
    error(...message: any): void
}

class ConsoleLogger implements Logger {
    error(...message: any): void {
        if (logLevel >= LogLevel.ERROR) {
            console.error(build(LogLevel.ERROR, message));
        }
    }

    info(...message: any): void {
        if (logLevel >= LogLevel.INFO) {
            console.log(build(LogLevel.INFO, message));
        }
    }

    debug(...message: any): void {
        if (logLevel >= LogLevel.DEBUG) {
            console.log(build(LogLevel.DEBUG, message));
        }
    }
}

function now(): string {
    return new Date().toISOString();
}

function build(level: LogLevel, message: any[]): string {
    const body = message.map(x => util.inspect(x)).join(' ');
    return `${now()} ${LogLevel[level]} ${body}`;
}

export const logger: Logger = new ConsoleLogger();

