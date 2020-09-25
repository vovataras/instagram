import React, { useEffect, useRef } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { onAuthStateChanged } from '../../api/firebase'
import { verifyAuth } from '../../redux/auth/actions'
import { RootState } from '../../redux/store'
import { initializeApp } from '../../redux/app/actions'
import Initialization from '../modules/Initialization'
import { posts, userPosts, users } from '../../services/database'
import { setPosts, setError as setPostsError } from '../../redux/posts/actions'
import {
  setUserPosts,
  resetState as resetUserPostsState,
  setError as setUserPostsError
} from '../../redux/userPosts/actions'
import { PostArray, UsersObject } from '../../typings'
import { setUsers, setError as setUsersError } from '../../redux/users/actions'
import AppView from './view'

interface Props extends PropsFromRedux {}

const App: React.FC<Props> = ({
  initialized,
  uid,
  verifyAuth,
  initializeApp,
  setPosts,
  setPostsError,
  setUserPosts,
  setUserPostsError,
  resetUserPostsState,
  setUsers,
  setUsersError
}) => {
  const listener = useRef(null as firebase.Unsubscribe | null)

  useEffect(() => {
    listener.current = onAuthStateChanged((authUser) => {
      if (!authUser) {
        resetUserPostsState()
        if (!!uid) userPosts.off(uid)
      } else {
        userPosts.on(authUser.uid, 'value', (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val()
            const entries = Object.entries(data)
            setUserPosts(entries.reverse() as PostArray)
          } else {
            setUserPostsError('No posts yet.')
          }
        })
      }

      verifyAuth(authUser)

      if (!initialized) {
        initializeApp()
      }
    })

    posts.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const entries = Object.entries(data)
        setPosts(entries.reverse() as PostArray)
      } else {
        setPostsError('No data available!')
      }
    })

    users.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setUsers(data as UsersObject)
      } else {
        setUsersError('No data available!')
      }
    })

    return () => {
      if (!!listener) {
        listener.current!()
      }
      posts.off()
      users.off()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!initialized) return <Initialization />

  return <AppView />
}

let mapState = (state: RootState) => ({
  initialized: state.app.initialized,
  uid: state.auth.uid
})

const connector = connect(mapState, {
  verifyAuth,
  initializeApp,
  setPosts,
  setPostsError,
  setUserPosts,
  setUserPostsError,
  resetUserPostsState,
  setUsers,
  setUsersError
})

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(App)
