import styles from './Input.module.sass'
import { FC } from 'react'

interface InputProps {
    label?: string;
    placeholer?: string;
    value?: string;
    setValue: ((value: string) => void)
}

const Input: FC<InputProps> = ({ label = '', placeholer = '', setValue }) => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.label}>{label}</p>
            <input className={styles.input} type="text" onChange={(e) => setValue(e.target.value)} placeholder={placeholer && 'Пример: ' + placeholer} />
        </div>
    )
}

export default Input