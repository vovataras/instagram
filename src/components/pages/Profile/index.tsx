import React from 'react'
import { AuthUser } from '../../../typings'
import withAuthorization from '../../../hocs/withAuthorization'
import { RootState } from '../../../redux/store'
import { connect, ConnectedProps } from 'react-redux'
import ProfileView from './view'
import LayoutPreloader from '../../modules/LayoutPreloader'

interface Props extends PropsFromRedux {}

const Profile: React.FC<Props> = ({ user, posts, users, isUsersLoaded }) => {
  if (!user) return null
  if (!isUsersLoaded) return <LayoutPreloader />
  return <ProfileView user={user} posts={posts} users={users!} />
}

let mapState = (state: RootState) => ({
  user: state.auth.user,
  posts: state.userPosts.items,
  users: state.users.items,
  isUsersLoaded: state.users.isLoaded
})

const connector = connect(mapState, {})

type PropsFromRedux = ConnectedProps<typeof connector>

const condition = (authUser: AuthUser) => !authUser

export default withAuthorization(condition)(connector(Profile))
