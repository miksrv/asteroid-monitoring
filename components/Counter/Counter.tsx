import React from 'react'

import styles from './styles.module.sass'

type CounterProps = {
    total?: number
    dangerous?: number
}

export const Counter: React.FC<CounterProps> = ({ total, dangerous }) => (
    <div className={styles.counter}>
        {(!!total || !!dangerous) && <div className={styles.divider} />}
        {!!total && (
            <div>
                <span className={styles.totalNumber}>{total}</span> Найдено астероидов
            </div>
        )}
        {!!dangerous && (
            <div>
                <span className={styles.dangerNumber}>{dangerous}</span> Потенциально опасных
            </div>
        )}
    </div>
)

export default Counter
