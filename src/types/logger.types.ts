export type LoggerOptions = {
    type?: 'log' | 'info' | 'error' | 'warn' | 'debug'
    message: string
}

export type LoggerFunction<LoggerOptions> = (options: LoggerOptions) => void