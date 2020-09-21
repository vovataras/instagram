import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import styles from './style.module.scss'

const Preloader = () => {
  return (
    <div className={styles.container}>
      <CircularProgress size={70} className={styles.preloader} />
    </div>
  )
}

export default Preloader
