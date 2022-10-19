import { logger } from "./lib/logger";
import { Event } from "./types/events.types";

export const events: Event[] = [
    {
        name: 'Toma Agüita💧',
        description: 'El cuerpo lo necesita',
        actionTime: ['19:00', '18:00'],
    },
    {
        name: 'No olvides comer🍔🍕',
        description: 'No importa si no tienes hambre',
        actionTime: '19:10',
        // enable: false,
    },
    {
        name: 'Duerme un poco, mi pana💤',
        actionTime: '13:35',
        enable: true,
    }
]

export const getAllEvents = async (): Promise<Event[] | undefined> => {
    // TODO: Get events from spreadsheet file
    const evs = events
    return evs
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