import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import withAuthorization from '../../../hocs/withAuthorization'
import { RootState } from '../../../redux/store'
import { AuthUser } from '../../../typings'
import LayoutPreloader from '../../modules/LayoutPreloader'
import FeedView from './view'

interface Props extends PropsFromRedux {}

const Feed: React.FC<Props> = ({
  isPostsLoaded,
  postsError,
  posts,
  isUsersLoaded,
  users,
  currentUid
}) => {
  if (!isPostsLoaded || !isUsersLoaded) return <LayoutPreloader />
  return (
    <FeedView
      posts={posts!}
      users={users!}
      postsError={postsError}
      currentUid={currentUid}
    />
  )
}

const condition = (authUser: AuthUser) => !authUser

let mapState = (state: RootState) => ({
  isPostsLoaded: state.posts.isLoaded,
  postsError: state.posts.error,
  posts: state.posts.items,
  isUsersLoaded: state.users.isLoaded,
  users: state.users.items,
  currentUid: state.auth.uid
})

const connector = connect(mapState, {})

type PropsFromRedux = ConnectedProps<typeof connector>

export default withAuthorization(condition)(connector(Feed))
