import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Routes from '../../constants/routes'
import { Login, Register, Feed, Profile, AddPost } from '../pages'
import styles from './style.module.scss'

const App = () => {
  return (
    <div className={styles.app}>
      <Switch>
        <Route exact path={Routes.FEED} component={Feed} />
        <Route exact path={Routes.PROFILE} component={Profile} />
        <Route exact path={Routes.SIGN_IN} component={Login} />
        <Route exact path={Routes.SIGN_UP} component={Register} />
        <Route exact path={Routes.ADD_POST} component={AddPost} />
      </Switch>
    </div>
  )
}

export default App
