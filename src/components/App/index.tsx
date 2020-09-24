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
import Initialization from '../modules/Initialization'
import { posts, userPosts } from '../../services/database'
import { setPosts } from '../../redux/posts/actions'
import {
  setUserPosts,
  resetState as resetUserPostsState
} from '../../redux/userPosts/actions'

interface Props extends PropsFromRedux {}

const App: React.FC<Props> = ({
  initialized,
  uid,
  verifyAuth,
  initializeApp,
  setPosts,
  setUserPosts,
  resetUserPostsState
}) => {
  const listener = useRef(null as firebase.Unsubscribe | null)

  useEffect(() => {
    listener.current = onAuthStateChanged((authUser) => {
      if (!authUser) {
        resetUserPostsState()
        if (!!uid) userPosts.off(uid)
      } else {
        userPosts.on(authUser.uid, 'value', (snapshot) => {
          const entries = Object.entries(snapshot.val())
          setUserPosts(entries.reverse())
        })
      }

      verifyAuth(authUser)

      if (!initialized) {
        initializeApp()
      }
    })

    posts.on('value', (snapshot) => {
      const entries = Object.entries(snapshot.val())
      setPosts(entries.reverse())
    })

    return () => {
      if (!!listener) {
        listener.current!()
      }
      posts.off()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!initialized) return <Initialization />

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
  initialized: state.app.initialized,
  uid: state.auth.uid
})

const connector = connect(mapState, {
  verifyAuth,
  initializeApp,
  setPosts,
  setUserPosts,
  resetUserPostsState
})

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(App)
