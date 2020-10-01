import React from 'react'
import CommentBlock, { FormValues } from '../../modules/CommentBlock'
import Layout from '../../modules/Layout'
import PostCard from '../../modules/PostCard'
import { Post, User } from '../../../typings'
import { FormikHelpers } from 'formik'
import Routes from '../../../constants/routes'

interface Props {
  post: Post
  user: User
  currentUid?: string
  commentsContent: JSX.Element | JSX.Element[] | null
  isCommentsLoaded: boolean
  handleSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void
  handleLikeClick?: () => void
}

const PostView: React.FC<Props> = ({
  post,
  user,
  currentUid,
  commentsContent,
  isCommentsLoaded,
  handleSubmit,
  handleLikeClick
}) => {
  let { date, ...postData } = post
  let { uid, username, avatar } = user

  const profileLink = Routes.PROFILE_ID.replace(':id', uid!)

  return (
    <Layout>
      <PostCard
        profileLink={profileLink}
        username={username}
        avatar={avatar}
        date={new Date(post.date).toDateString()}
        {...postData}
        currentUid={currentUid}
        handleLikeClick={handleLikeClick}
      />
      <CommentBlock
        handleSubmit={handleSubmit}
        commentsContent={commentsContent}
        isCommentsLoaded={isCommentsLoaded}
      />
    </Layout>
  )
}

export default PostView
