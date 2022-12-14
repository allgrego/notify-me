import { getAllEvents, getLasCorrespondingEvent } from './events'
import { logger } from './lib/logger'
import { notify } from './notifier'

async function main() {

    try {
        logger({ message: 'Starting execution', type: 'info' })

        const args = process.argv.slice(2)
        const eventsXlsxFilePath = args[0] || undefined

        const allEvents = await getAllEvents(eventsXlsxFilePath) // Including disabled ones
        logger({ message: `Total registered events : ${allEvents?.length || 0}`, type: 'debug' })

        // Filter only the valid ones
        const validEvents = getLasCorrespondingEvent(allEvents || [])
        logger({ message: `Total events to be notified: ${validEvents.length}`, type: 'debug' })

        if (validEvents.length) logger({ message: 'Notifying...', type: 'info' })

        // Notify every valid event
        await Promise.all(validEvents.map(event => notify({
            title: event.name,
            message: event.description,
        })))

        logger({ message: 'Execution finished succesfully', type: 'info' })

    } catch (error) {
        logger({ message: `${error}`, type: 'error' })
        return
    }
}

main()
