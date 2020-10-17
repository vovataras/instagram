import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import withAuthorization from '../../../hocs/withAuthorization'
import { RootState } from '../../../redux/store'
import { AuthUser } from '../../../typings'
import LayoutError from '../../modules/LayoutError'
import LayoutPreloader from '../../modules/LayoutPreloader'
import FeedView from './view'

interface Props extends PropsFromRedux {}

const Feed: React.FC<Props> = ({
  isPostsLoaded,
  postsError,
  posts,
  isUsersLoaded,
  users,
  currentUid,
  isCommentsLoaded,
  comments
}) => {
  if (!isPostsLoaded || !isUsersLoaded || !isCommentsLoaded) {
    return <LayoutPreloader />
  }

  let content: JSX.Element[] | JSX.Element | null = null

  if (postsError) {
    content = <LayoutError error={postsError} />
  } else {
    if (posts && users && currentUid) {
      content = (
        <FeedView
          posts={posts}
          users={users}
          comments={comments}
          currentUid={currentUid}
        />
      )
    } else {
      content = <LayoutError error="Something went wrong" />
    }
  }

  return content
}

const condition = (authUser: AuthUser) => !authUser

let mapState = (state: RootState) => ({
  isPostsLoaded: state.posts.isLoaded,
  postsError: state.posts.error,
  posts: state.posts.items,
  isUsersLoaded: state.users.isLoaded,
  users: state.users.items,
  currentUid: state.auth.uid,
  isCommentsLoaded: state.comments.isLoaded,
  comments: state.comments.items
})

const connector = connect(mapState, {})

type PropsFromRedux = ConnectedProps<typeof connector>

export default withAuthorization(condition)(connector(Feed))
