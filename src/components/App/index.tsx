import styles from './App.module.sass';
import Header from '../Header'
import Setting from '../Setting';
import { useState } from 'react'
import VacanciesList from '../VacanciesList'

const App = () => {
    const [connected, setConnected] = useState<boolean>(false)
    const [requestParams, setRequestParams] = useState({
        serverUrl: '',
        databaseUrl: '',
        portUrl: '',
        token: ''
    })


    return (
        <div className={styles.wrapper}>
            <Header connected={connected} setConnected={setConnected} />

            {connected
                ? <VacanciesList setConnected={setConnected} />
                : <Setting setConnected={setConnected} requestParams={requestParams} saveRequestParams={setRequestParams} />}
        </div>
    );
}

export default App;
