import { FC } from 'react'
import styles from './Button.module.sass'

interface ButtonProps {
    text: string;
    callback: () => void;
}

const Button: FC<ButtonProps> = ({ text, callback }) => {
    return (
        <button className={styles.button} onClick={callback}>{text}</button>
    )
}

export default Button