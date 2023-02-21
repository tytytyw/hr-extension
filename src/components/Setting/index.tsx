import Button from '../Button'
import Input from '../Input'
import styles from './Setting.module.sass'
import { useState, FC } from 'react'
import classNames from 'classnames'
import Error from '../Error'

interface requestParamsProps {
	serverUrl: string,
	databaseUrl: string,
	portUrl: string,
	token: string
}

interface SettingProps {
	setConnected: (connected: boolean) => void;
	requestParams: requestParamsProps;
	saveRequestParams: (requestParams: requestParamsProps) => void;
	vacancies?: Array<{ GUID: string, title: string }>;
	setShowLoader: (showLoader: boolean) => void
}

interface showError {
	show: boolean;
	title?: string;
	text?: string;
}

const Setting: FC<SettingProps> = ({ setConnected, requestParams, vacancies, saveRequestParams, setShowLoader }) => {
	const [serverUrl, setServerUrl] = useState<string>(requestParams.serverUrl)
	const [databaseUrl, setDatabaseUrl] = useState<string>(requestParams.databaseUrl)
	const [token, setToken] = useState<string>(requestParams.token)
	const [portUrl, setPortUrl] = useState<string>(requestParams.portUrl)
	const [showError, setShowError] = useState<showError>({ show: false })


	const connectToAuth = () => {
		setShowLoader(true)

		if (serverUrl && token) {
			// авторизация
			fetch(`${serverUrl + (databaseUrl ? '/' + databaseUrl : '') + (portUrl ? ':' + portUrl : '')}/hs/extension/auth`, {
				method: 'GET',
				// mode: 'no-cors',

				headers: {
					'Authorization': "Basic " + token,
					'Access-Control-Allow-Origin': '*'
				},
			})
				.then(res => {
					if (res.status === 200) {

						saveRequestParams({ serverUrl, databaseUrl, token, portUrl });

						localStorage.setItem("serverUrl", serverUrl)
						localStorage.setItem("databaseUrl", databaseUrl)
						localStorage.setItem("token", token)
						localStorage.setItem("portUrl", portUrl)
						localStorage.setItem("connected", "true")

						// next step
						setConnected(true)

					} else if (res.status === 401) {
						// ошибка авториз
						setShowError({ show: true, title: 'Ошибка авторизации', text: 'Проверьте правильность введенных данных и повторите' })
						setConnected(false)
						localStorage.setItem("connected", "false")
					} else if (res.status === 404) {
						// ошибка авториз
						setShowError({ show: true, title: 'Ошибка авторизации', text: 'Проверьте правильность введенных данных и повторите' })
						setConnected(false)
						localStorage.setItem("connected", "false")
					} else {
						setConnected(false);
						localStorage.setItem("connected", "false")
					}
				})
				.catch(er => {
					console.log('err', er)
					setShowError({ show: true, title: 'Ошибка соединения', text: 'Проверьте данные соединения' })
					setConnected(false);
					localStorage.setItem("connected", "false")
				})
				.finally(() => setShowLoader(false))

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
				<Button text={'Подключиться'} callback={connectToAuth} disabled={!(serverUrl && token)} />
			</div>
			{requestParams.serverUrl && requestParams.token && vacancies?.length
				? <div className={classNames(styles.buttonWrapper, styles.bottomBtn)}>
					<Button text={'Назад'} callback={() => { setConnected(true) }} />
				</div> : null}
			{showError.show ? <Error close={() => setShowError({ show: false })} title={showError?.title} text={showError?.text} /> : ''}
		</div>
	)
}

export default Setting