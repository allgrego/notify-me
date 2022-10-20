import readXlsxFile from 'read-excel-file/node'
import fs from 'fs'
import path from 'path'
import { logger } from "./lib/logger";
import { Event } from "./types/events.types";

export const getAllEvents = async (providedFilePath: string | undefined): Promise<Event[] | undefined> => {

    if (!providedFilePath) throw new Error(`A xlsx file path for events is required as argument`)

    const filePath = path.resolve(providedFilePath)

    if (!fs.existsSync(filePath)) throw new Error(`Non existing XLSX file for events in "${filePath}"`)

    let allRows = await readXlsxFile(filePath)

    const dataRows = allRows.slice(1)

    const events: Event[] = dataRows.map(row => {

        const name: string | null = String(row[0]).trim()
        const enable: boolean = !['false', 'falso', 'no', 'negativo'].includes(String(row[3]).trim().toLowerCase())

        let description: string | undefined = String(row[1]).trim()
        if (description === 'null') description = undefined

        const actionTimesArr = String(row[2]).trim()

        const actionTimes: string | string[] = actionTimesArr.split(',').map(t => t.trim())

        const event: Event = {
            name,
            description,
            actionTime: actionTimes.length === 1 ? actionTimes[0] : actionTimes,
            enable
        }

        return event
    })

    return events
}

export const getLasCorrespondingEvent = (events: Event[]) => {

    const validEvents = events.filter((e: Event) => {

        if (e?.enable === false) return false

        const { actionTime: actionTimeStr } = e

        if (!actionTimeStr) {
            logger({ message: `Error: Event "${e.name}" has no actionTime`, type: 'error' })
            return false
        }

        const times = Array.isArray(actionTimeStr) ? [...actionTimeStr] : [actionTimeStr]

        const now = new Date()

        const validTimes = times.filter((time: string) => {

            const isValid = RegExp(/^\d{2}\:\d{2}$/gmi).test(time)

            if (!isValid) {
                logger({ message: `Invalid format for parameter "actionTime" in event "${e.name}". Must be in format "hh:mm" but obtained "${time}" instead`, type: 'error' })
                return false
            }

            const [hoursStr, minutesStr] = time.split(':')

            const hours = Number(hoursStr || NaN)
            const minutes = Number(minutesStr || NaN)

            const eventTimeDate = new Date()
            eventTimeDate.setHours(hours, minutes, 0)

            // 1 hour
            const MAX_TIME_DIFF_MINUTES = 1 * 60

            // Time difference in minutes
            const timeDiff = (now.getTime() - eventTimeDate.getTime()) / 1000 / 60

            const eventTimeHasPassed = timeDiff >= 0
            const isWithinThreshold = Math.abs(timeDiff) < MAX_TIME_DIFF_MINUTES

            return eventTimeHasPassed && isWithinThreshold
        })

        return validTimes.length > 0

    })

    return validEvents
}