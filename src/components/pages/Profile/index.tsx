import React from 'react'
import { AuthUser } from '../../../typings'
import withAuthorization from '../../../hocs/withAuthorization'
import { RootState } from '../../../redux/store'
import { connect, ConnectedProps } from 'react-redux'
import ProfileView from './view'
import LayoutPreloader from '../../modules/LayoutPreloader'

interface Props extends PropsFromRedux {}

const Profile: React.FC<Props> = ({
  user,
  isUsersLoaded,
  users,
  isPostsLoaded,
  postsError,
  posts
}) => {
  if (!user) return null
  if (!isUsersLoaded || !isPostsLoaded) return <LayoutPreloader />
  return (
    <ProfileView
      user={user}
      posts={posts!}
      users={users!}
      postsError={postsError}
    />
  )
}

let mapState = (state: RootState) => ({
  user: state.auth.user,
  isUsersLoaded: state.users.isLoaded,
  users: state.users.items,
  isPostsLoaded: state.userPosts.isLoaded,
  postsError: state.userPosts.error,
  posts: state.userPosts.items
})

const connector = connect(mapState, {})

type PropsFromRedux = ConnectedProps<typeof connector>

const condition = (authUser: AuthUser) => !authUser

export default withAuthorization(condition)(connector(Profile))
