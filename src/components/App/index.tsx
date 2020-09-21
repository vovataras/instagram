import React, { useEffect, useRef } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { onAuthStateChanged } from '../../api/firebase'
import Routes from '../../constants/routes'
import { Login, Register, Feed, Profile, AddPost, Post } from '../pages'
import { verifyAuth } from '../../redux/auth/actions'

import styles from './style.module.scss'
import { RootState } from '../../redux/store'
import { initializeApp } from '../../redux/app/actions'

interface Props extends PropsFromRedux {}

const App: React.FC<Props> = ({ verifyAuth, initialized, initializeApp }) => {
  const listener = useRef(null as firebase.Unsubscribe | null)

  useEffect(() => {
    listener.current = onAuthStateChanged((authUser) => {
      verifyAuth(authUser)

      if (!initialized) {
        initializeApp()
      }
    })

    return () => {
      if (!!listener) {
        listener.current!()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!initialized) return <div>Initializing</div>

  return (
    <div className={styles.app}>
      <Switch>
        <Route exact path={Routes.FEED} component={Feed} />
        <Route exact path={Routes.PROFILE} component={Profile} />
        <Route exact path={Routes.SIGN_IN} component={Login} />
        <Route exact path={Routes.SIGN_UP} component={Register} />
        <Route exact path={Routes.ADD_POST} component={AddPost} />
        <Route exact path={Routes.POST} component={Post} />
      </Switch>
    </div>
  )
}

let mapState = (state: RootState) => ({
  initialized: state.app.initialized
})

const connector = connect(mapState, {
  verifyAuth,
  initializeApp
})

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(App)
