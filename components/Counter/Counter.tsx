import React from 'react'
import { useTranslation } from 'react-i18next'

import styles from './styles.module.sass'

type CounterProps = {
    total?: number
    dangerous?: number
}

export const Counter: React.FC<CounterProps> = ({ total, dangerous }) => {
    const { t } = useTranslation()

    return (
        <div className={styles.counter}>
            {(!!total || !!dangerous) && <div className={styles.divider} />}
            {!!total && (
                <div>
                    <span className={styles.totalNumber}>{total}</span> {t('counter.found')}
                </div>
            )}
            {!!dangerous && (
                <div>
                    <span className={styles.dangerNumber}>{dangerous}</span> {t('counter.dangerous')}
                </div>
            )}
        </div>
    )
}

export default Counter
