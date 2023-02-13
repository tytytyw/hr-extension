import styles from './Input.module.sass'
import { FC } from 'react'
import classNames from 'classnames';

interface InputProps {
    label?: string;
    placeholer?: string;
    value?: string;
    setValue: ((value: string) => void);
    type?: string
}

const Input: FC<InputProps> = ({ label = '', placeholer = '', setValue, type = 'text', value }) => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.label}>{label}</p>
            {type === 'text' ? <input className={styles.input} value={value} type="text" onChange={(e) => setValue(e.target.value)} placeholder={placeholer && 'Пример: ' + placeholer} /> : null}
            {type === 'textarea' ? <textarea value={value} className={classNames(styles.textarea, styles.input)} onChange={(e) => setValue(e.target.value)} placeholder={placeholer && 'Пример: ' + placeholer} /> : null}
        </div>
    )
}

export default Input