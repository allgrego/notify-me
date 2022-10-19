export type Event = {
    id?: string
    name: string
    description?: string
    enable?: boolean
    actionTime?: string | string[]     // Militar hour "hh:mm"
}