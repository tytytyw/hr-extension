import Button from '../Button'
import Input from '../Input'
import styles from './Setting.module.sass'
import { useState, FC } from 'react'

interface SettingProps {
  setConnected: (connected: boolean) => void;
}

const Setting: FC<SettingProps> = ({ setConnected }) => {
  const [serverUrl, setServerUrl] = useState<string>('')
  const [databaseUrl, setDatabaseUrl] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [portUrl, setPortUrl] = useState<string>('')


  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Настройки соединения</h2>
      <Input value={serverUrl} label={'Адрес сервера'} placeholer={'https://localnet'} setValue={setServerUrl} />
      <Input value={databaseUrl} label={'Адрес информационной базы на сервере'} placeholer={'database'} setValue={setDatabaseUrl} />
      <Input value={portUrl} label={'Порт подключения'} placeholer={'5050'} setValue={setPortUrl} />
      <Input value={token} label={'Токен доступа'} placeholer={'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpX...'} setValue={setToken} />
      <div className={styles.buttonWrapper}>
        <Button text={'Подключиться'} callback={() => { setConnected(true) }} disabled={!(serverUrl && databaseUrl && token && portUrl)} />
      </div>
    </div>
  )
}

export default Setting