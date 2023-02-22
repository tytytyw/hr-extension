import { FC } from 'react'
import Button from '../Button'
import styles from './Error.module.sass'

interface ErrorProps {
    close: () => void;
    closeText?: string
    title?: string;
    text?: string;
    setDouble?: () => void
}

const Error: FC<ErrorProps> = ({
    close, setDouble,
    title = 'Ошибка',
    text = 'Что-то пошло не так, попробуйте еще раз.',
    closeText = 'Повторить'
}) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.header}>{title}</div>
                <div className={styles.text}>{text.split(',').map((item, i, arr) => <p key={i}>{item}{i < arr.length - 1 ? ',' : ''}</p>)}</div>
                <div className={styles.buttonWrapper}>
                    {setDouble ? <Button text='Все равно добавить' callback={setDouble} /> : ''}
                    <Button text={closeText} callback={close} />
                </div>
            </div>
        </div>
    )
}

export default Error