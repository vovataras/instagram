import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Routes from '../../constants/routes'
import { Login, Register } from '../pages'
import styles from './style.module.scss'

const App = () => {
  return (
    <div className={styles.app}>
      <Switch>
        <Route path={Routes.SIGN_IN} component={Login} />
        <Route path={Routes.SIGN_UP} component={Register} />
      </Switch>
    </div>
  )
}

export default App
