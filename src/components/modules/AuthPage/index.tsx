import { Container, Paper, Typography } from '@material-ui/core'
import React from 'react'
import styles from './style.module.scss'
import { Link } from 'react-router-dom'
import { Link as MaterialLink } from '@material-ui/core'

interface Props {
  children: React.ReactNode
  linkTo: string
  linkMessage: string
}

const AuthPage: React.FC<Props> = ({ children, linkTo, linkMessage }) => {
  return (
    <div className={styles.authPage}>
      <Container maxWidth="xs">
        <Paper className={styles.paper} elevation={3}>
          <Typography component="h1" variant="h5" className={styles.title}>
            Instagram
          </Typography>
          {children}
          <MaterialLink>
            <Link to={linkTo}>{linkMessage}</Link>
          </MaterialLink>
        </Paper>
      </Container>
    </div>
  )
}

export default AuthPage
