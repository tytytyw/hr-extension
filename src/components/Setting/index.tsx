import Button from '../Button'
import Input from '../Input'
import styles from './Setting.module.sass'
import { useState, FC } from 'react'
import classNames from 'classnames'

interface requestParamsProps {
  serverUrl: string,
  databaseUrl: string,
  portUrl: string,
  token: string
}

interface SettingProps {
  setConnected: (connected: boolean) => void;
  requestParams: requestParamsProps;
  saveRequestParams: (requestParams: requestParamsProps) => void,
}

const Setting: FC<SettingProps> = ({ setConnected, requestParams, saveRequestParams }) => {
  const [serverUrl, setServerUrl] = useState<string>(requestParams.serverUrl)
  const [databaseUrl, setDatabaseUrl] = useState<string>(requestParams.databaseUrl)
  const [token, setToken] = useState<string>(requestParams.token)
  const [portUrl, setPortUrl] = useState<string>(requestParams.portUrl)

  const connectToApi = () => {
    if (serverUrl && databaseUrl && token && portUrl) {
      setConnected(true)

      saveRequestParams({ serverUrl, databaseUrl, token, portUrl })

    }
  }


  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Настройки соединения</h2>
      <Input value={serverUrl} label={'Адрес сервера'} placeholer={'https://localnet'} setValue={setServerUrl} />
      <Input value={databaseUrl} label={'Адрес информационной базы на сервере'} placeholer={'database'} setValue={setDatabaseUrl} />
      <Input value={portUrl} label={'Порт подключения'} placeholer={'5050'} setValue={setPortUrl} />
      <Input value={token} label={'Токен доступа'} placeholer={'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpX...'} setValue={setToken} />
      <div className={styles.buttonWrapper}>
        <Button text={'Подключиться'} callback={connectToApi} disabled={!(serverUrl && databaseUrl && token && portUrl)} />
      </div>
      {requestParams.portUrl && requestParams.databaseUrl && requestParams.serverUrl && requestParams.token
        ? <div className={classNames(styles.buttonWrapper, styles.bottomBtn)}>
          <Button text={'Назад'} callback={() => { setConnected(true) }} />
        </div> : null}
    </div>
  )
}

export default Setting