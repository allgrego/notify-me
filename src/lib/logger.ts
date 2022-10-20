import { writeFileSync } from 'fs'
import { join } from 'path'

import { LoggerFunction, LoggerOptions } from "../types/logger.types"

export const logger: LoggerFunction<LoggerOptions> = ({
    message = "",
    type = 'debug',
}) => {
    // Current timestamp
    const now = new Date().toLocaleString()

    const logMessage = `[${type.toUpperCase()}]\t[${now}]\t${message}\r\n`

    const fileName = join(__dirname, '..', '..', 'app.log')
    writeFileSync(fileName, logMessage, { flag: 'a', encoding: 'utf-8' })

    if (type === 'error') console.error(message)
}