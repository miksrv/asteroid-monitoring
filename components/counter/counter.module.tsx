import React from 'react'

import styles from './styles.module.sass'

type TCounterProps = {
    total?: number
    dangerous?: number
}

export const Counter: React.FC<TCounterProps> = ({ total, dangerous }) => (
    <div className={styles.counter}>
        {(!!total || !!dangerous) && <div className={styles.divider} />}
        {!!total && (
            <div>
                <span className={styles.totalNumber}>{total}</span> Найдено
                астероидов
            </div>
        )}
        {!!dangerous && (
            <div>
                <span className={styles.dangerNumber}>{dangerous}</span>{' '}
                Потенциально опасных
            </div>
        )}
    </div>
)
