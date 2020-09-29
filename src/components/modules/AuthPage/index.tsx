import { Container, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import Snackbar from '../../elements/Snackbar'

import styles from './style.module.scss'

interface Props {
  children: React.ReactNode
  linkTo: string
  linkMessage: string
  alertOpen?: boolean
  alertMessage?: string
  alertHandleClose?: (
    event?: React.SyntheticEvent<Element, Event> | undefined,
    reason?: string | undefined
  ) => void
}

const AuthPage: React.FC<Props> = ({
  children,
  linkTo,
  linkMessage,
  alertOpen,
  alertMessage,
  alertHandleClose
}) => {
  return (
    <div className={styles.authPage}>
      <Container maxWidth="xs">
        <Paper className={styles.paper} elevation={3}>
          <Typography component="h1" variant="h5" className={styles.title}>
            Instagram
          </Typography>
          {children}
          <Link to={linkTo} className={styles.link}>
            {linkMessage}
          </Link>
        </Paper>
      </Container>
      <Snackbar
        open={alertOpen}
        message={alertMessage}
        handleClose={alertHandleClose}
      />
    </div>
  )
}

export default AuthPage
