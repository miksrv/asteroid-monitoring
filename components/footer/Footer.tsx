import React from 'react'

import styles from './styles.module.sass'

import packageInfo from '@/package.json'
import { update } from '@/update'

export const Footer: React.FC = () => (
    <div className={styles.footer}>
        Copyright ©
        <a
            href='https://miksoft.pro'
            className={styles.copyrightLink}
            title=''
        >
            <img
                src='https://miksoft.pro/favicon.ico'
                alt=''
            />
            Mik
        </a>{' '}
        {new Date().getFullYear()}, Version <span>{packageInfo.version}</span> <span>({update})</span>
    </div>
)

export default Footer
