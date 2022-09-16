import styles from './App.module.sass';
import Header from '../Header'
import Setting from '../Setting';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Header />

      <Setting />
    </div>
  );
}

export default App;
