import styles from './Input.module.sass'
import { FC } from 'react'

interface InputProps {
    label?: string;
    placeholer?: string;
    onchage: () => void
}

const Input: FC<InputProps> = ({ label = '', placeholer = '', onchage }) => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.label}>{label}</p>
            <input className={styles.input} type="text" onChange={onchage} placeholder={placeholer && 'Пример: ' + placeholer} />
        </div>
    )
}

export default Input