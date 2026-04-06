import dayjs from 'dayjs'

import 'dayjs/locale/en'
import 'dayjs/locale/ru'

const DEFAULT_FORMAT = 'D MMM YYYY HH:mm:ss'

dayjs.locale('ru')

export const setDayjsLocale = (lang: string) => {
    dayjs.locale(lang)
}

export const formatDate = (date?: string | number, format?: string) =>
    date ? dayjs(date).format(format || DEFAULT_FORMAT) : ''
