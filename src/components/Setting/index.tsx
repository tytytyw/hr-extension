import Button from '../Button'
import Input from '../Input'
import styles from './Setting.module.sass'

const Setting = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Настройки соединения</h2>
      <Input label={'Адрес сервера'} placeholer={'https://localnet'} onchage={() => { }} />
      <Input label={'Адрес информационной базы на сервере'} placeholer={'database'} onchage={() => { }} />
      <Input label={'Порт подключения'} placeholer={'5050'} onchage={() => { }} />
      <Input label={'Токен доступа'} placeholer={'5050'} onchage={() => { }} />
      <div className={styles.buttonWrapper}>
        <Button text={'Подключиться'} callback={() => { }} />
      </div>
    </div>
  )
}

export default Setting