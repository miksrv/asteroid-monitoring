import React from 'react'

import Image from 'next/image'

import packageInfo from '@/package.json'
import { formatDate } from '@/tools/date'
import { update } from '@/update'

import styles from './styles.module.sass'

export const Footer: React.FC = () => (
    <footer className={styles.footer}>
        <div>Powered by NextJS + TypeScript + Redux.</div>
        <div>
            Copyright ©
            <a
                href={'https://miksoft.pro'}
                className={styles.link}
            >
                <Image
                    className={styles.copyrightImage}
                    src={'/favicon.ico'}
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
            >
                {'GitHub'}
            </a>
            ({formatDate(update, 'DD.MM.YYYY, HH:mm')})
        </div>
    </footer>
)

export default Footer
