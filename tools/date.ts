import dayjs from 'dayjs'

const DEFAULT_FORMAT = 'D MMM YYYY HH:mm:ss'

export const formatUnixTime = (unix?: number, format?: string) =>
    unix ? dayjs(unix).format(format || DEFAULT_FORMAT) : ''
