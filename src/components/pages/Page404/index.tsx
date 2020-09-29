import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import Layout from '../../modules/Layout'
import { AuthUser } from '../../../typings'
import withAuthorization from '../../../hocs/withAuthorization'

import styles from './style.module.scss'

const Page404 = () => {
  return (
    <Layout>
      <Paper className={styles.paper}>
        <Typography variant="h4">Page Not Found</Typography>
        <Typography variant="subtitle1">
          We couldn't find what you were looking for.
        </Typography>
      </Paper>
    </Layout>
  )
}

const condition = (authUser: AuthUser) => !authUser

export default withAuthorization(condition)(Page404)
