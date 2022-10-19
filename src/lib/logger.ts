import { LoggerFunction, LoggerOptions } from "../types/logger.types"

export const logger: LoggerFunction<LoggerOptions> = ({
    message = "",
    type = 'log',
}) => {
    // Current timestamp
    const now = new Date().toLocaleString()

    const logMessage = `[${type.toUpperCase()}]\t[${now}]\t${message}`
    console[type](logMessage)
}