export type LoggerOptions = {
    type?: 'log' | 'info' | 'error' | 'debug'
    message: string
}

export type LoggerFunction<LoggerOptions> = (options: LoggerOptions) => void