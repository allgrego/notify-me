export type NotifyOptions = {
    title: string
    message?: string
    wait?: boolean
    sound?: boolean
}


export type NotifyFunction<NotifyOptions> = (options: NotifyOptions) => void