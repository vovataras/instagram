import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import styles from './style.module.scss'

interface Props {
  size?: string | number
}

const Preloader: React.FC<Props> = ({ size }) => {
  return (
    <div className={styles.container}>
      <CircularProgress size={size ? size : 70} className={styles.preloader} />
    </div>
  )
}

export default Preloader
