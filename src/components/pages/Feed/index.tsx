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
  isUsersLoaded,
  posts,
  users
}) => {
  if (!isPostsLoaded || !isUsersLoaded) return <LayoutPreloader />
  return <FeedView posts={posts!} users={users!} />
}

const condition = (authUser: AuthUser) => !authUser

let mapState = (state: RootState) => ({
  isPostsLoaded: state.posts.isLoaded,
  isUsersLoaded: state.users.isLoaded,
  posts: state.posts.items,
  users: state.users.items
})

const connector = connect(mapState, {})

type PropsFromRedux = ConnectedProps<typeof connector>

export default withAuthorization(condition)(connector(Feed))
