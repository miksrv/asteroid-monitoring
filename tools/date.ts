import dayjs from 'dayjs'

import 'dayjs/locale/ru'

const DEFAULT_FORMAT = 'D MMM YYYY HH:mm:ss'

dayjs.locale('ru')

export const formatDate = (date?: string | number, format?: string) =>
    date ? dayjs(date).format(format || DEFAULT_FORMAT) : ''
