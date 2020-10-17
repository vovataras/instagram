import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { onAuthStateChanged } from '../../api/firebase'
import { verifyAuth } from '../../redux/auth/actions'
import { initializeApp } from '../../redux/app/actions'
import Initialization from '../modules/Initialization'
import { comments, posts, userPosts, users } from '../../services/database'
import { setPosts, setError as setPostsError } from '../../redux/posts/actions'
import {
  setUserPosts,
  resetState as resetUserPostsState,
  setError as setUserPostsError
} from '../../redux/userPosts/actions'
import {
  CommentArray,
  CommentsObject,
  PostArray,
  RootState,
  UsersObject
} from '../../typings'
import { setUsers, setError as setUsersError } from '../../redux/users/actions'
import {
  setComments,
  setError as setCommentsError
} from '../../redux/comments/actions'
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
  setUsersError,
  setComments,
  setCommentsError
}) => {
  useEffect(() => {
    const listener = onAuthStateChanged((authUser) => {
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

    comments.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        let commentsObj: CommentsObject = {}

        for (const key in data) {
          const entries = Object.entries(data[key])
          commentsObj[key] = entries as CommentArray
        }

        setComments(commentsObj)
      } else {
        setCommentsError('No data available!')
      }
    })

    return () => {
      if (!!listener) {
        listener()
      }
      posts.off()
      users.off()
      comments.off()
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
  setUsersError,
  setComments,
  setCommentsError
})

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(App)
