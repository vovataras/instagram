import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Routes from '../../constants/routes'
import { Login, Register, Feed, Profile, AddPost, Post, Page404 } from '../pages'

import styles from './style.module.scss'

const AppView = () => {
  return (
    <div className={styles.app}>
      <Switch>
        <Route exact path={Routes.FEED} component={Feed} />
        <Route exact path={Routes.PROFILE} component={Profile} />
        <Route exact path={Routes.SIGN_IN} component={Login} />
        <Route exact path={Routes.SIGN_UP} component={Register} />
        <Route exact path={Routes.ADD_POST} component={AddPost} />
        <Route exact path={Routes.POST} component={Post} />
        <Route exact path="*" component={Page404} />
      </Switch>
    </div>
  )
}

export default AppView
