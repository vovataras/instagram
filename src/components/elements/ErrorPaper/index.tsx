import React from 'react'
import { Paper } from '@material-ui/core'

import styles from './style.module.scss'

interface Props {
  error?: string
}

const ErrorPaper: React.FC<Props> = ({ error }) => {
  return <Paper className={styles.errorPaper}>{error}</Paper>
}

export default ErrorPaper
