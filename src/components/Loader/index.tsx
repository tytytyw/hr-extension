import React from 'react'
import styles from './Loader.module.sass'

const Loader = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default Loader