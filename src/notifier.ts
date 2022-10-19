import { WindowsToaster } from 'node-notifier'
import { NotifyFunction, NotifyOptions } from './types/notifier.types'

export const notify: NotifyFunction<NotifyOptions> = async ({
    title,
    message=" ",
    wait = false,
    sound = true,
}) => {

    const appName = 'Re-Mind-Me'

    new WindowsToaster({}).notify({
        appID: appName,
        title,
        message,
        wait,
        sound,
    })

}