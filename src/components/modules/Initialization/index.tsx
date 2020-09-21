import React from 'react'
import Preloader from '../../elements/Preloader'

import styles from './style.module.scss'

const Initialization = () => {
  return (
    <div className={styles.initialization}>
      <Preloader />
    </div>
  )
}

export default Initialization
