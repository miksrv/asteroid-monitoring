import React from 'react'
import Image from 'next/image'

import styles from './styles.module.sass'

import packageInfo from '@/package.json'
import { formatDate } from '@/tools/date'
import { update } from '@/update'

export const Footer: React.FC = () => (
    <footer
        className={styles.footer}
    >
        <div>Powered by NextJS + TypeScript + Redux.</div>
        <div>
            Copyright ©
            <a
                href={'https://miksoft.pro'}
                className={styles.link}
                title={''}
            >
                <Image
                    className={styles.copyrightImage}
                    src={'https://miksoft.pro/favicon.ico'}
                    alt={''}
                    width={11}
                    height={11}
                />
                {'Mik'}
            </a>
            {formatDate(new Date().toISOString(), 'YYYY')}, {'v'}
            {packageInfo.version}
            <a
                href={'https://github.com/miksrv/asteroid-monitoring'}
                rel={'nofollow noindex'}
                className={styles.link}
                title={''}
            >
                {'GitHub'}
            </a>
            ({formatDate(update, 'DD.MM.YYYY, HH:mm')})
        </div>
    </footer>
)

export default Footer
