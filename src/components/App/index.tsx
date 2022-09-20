import styles from './App.module.sass';
import Header from '../Header'
import Setting from '../Setting';
import { useState } from 'react'
import VacanciesList from '../VacanciesList'

const App = () => {
  const [connected, setConnected] = useState<boolean>(false)


  return (
    <div className={styles.wrapper}>
      <Header />

      {connected ? <VacanciesList setConnected={setConnected} /> : <Setting setConnected={setConnected} />}
    </div>
  );
}

export default App;
