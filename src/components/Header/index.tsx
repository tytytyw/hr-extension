import React from 'react'
import styles from './Header.module.sass'
import { ReactComponent as MainIcon} from "./1c_icon.svg";

const Header = () => {

  const logoSize = 40;
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo__wrapper}>
          <MainIcon className={styles.logo} width={logoSize} height={logoSize} />
      </div>
      <h1>Заголовок</h1>
      <div style={{minWidth: logoSize}}></div>
    </div>
  )
}

export default Header