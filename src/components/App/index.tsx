import React, { useEffect, useRef } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { onAuthStateChanged } from '../../api/firebase'
import Routes from '../../constants/routes'
import { Login, Register, Feed, Profile, AddPost, Post } from '../pages'
import { verifyAuth } from '../../redux/auth/actions'

import styles from './style.module.scss'
import { RootState } from '../../redux/store'

interface Props extends PropsFromRedux {}

const App: React.FC<Props> = ({ verifyAuth }) => {
  const listener = useRef(null as firebase.Unsubscribe | null)

  useEffect(() => {
    listener.current = onAuthStateChanged((authUser) => {
      verifyAuth(authUser)
    })

    return () => {
      if (!!listener) {
        listener.current!()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

let mapState = (state: RootState) => ({})

const connector = connect(mapState, {
  verifyAuth
})

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(App)
