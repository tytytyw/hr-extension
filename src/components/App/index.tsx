import styles from './App.module.sass';
import Header from '../Header'
import Setting from '../Setting';
import { useState } from 'react'
import VacanciesList from '../VacanciesList'
import Loader from '../Loader'

const App = () => {
    const [connected, setConnected] = useState<boolean>(false)
    const [requestParams, setRequestParams] = useState({
        serverUrl: 'https://arenda.topfactor.pro/RecLCH/hs/extension',
        databaseUrl: '',
        portUrl: '',
        token: '0JHRg9GA0LXQu9C+0LzQvtCy0LAg0JDQvdC90LA6MTIzNA=='
    })
    const [showLoader, setShowLoader] = useState<boolean>(false)

    const [vacancies, setVacancies] = useState<Array<{ GUID: string, title: string }>>([])



    return (
        <div className={styles.wrapper}>
            <Header connected={connected} setConnected={setConnected} />

            {connected
                ? <VacanciesList
                    vacancies={vacancies}
                    requestParams={requestParams}
                    setShowLoader={setShowLoader}
                />
                : <Setting
                    setConnected={setConnected}
                    requestParams={requestParams}
                    saveRequestParams={setRequestParams}
                    setVacancies={setVacancies}
                    vacancies={vacancies}
                    setShowLoader={setShowLoader}
                />}
            {showLoader ? <Loader /> : ''}
        </div>
    );
}

export default App;
