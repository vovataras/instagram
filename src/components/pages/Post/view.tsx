import React from 'react'
import CommentBlock, { FormValues } from '../../modules/CommentBlock'
import Layout from '../../modules/Layout'
import PostCard from '../../modules/PostCard'
import { Post, User } from '../../../typings'
import { FormikHelpers } from 'formik'

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
}

const PostView: React.FC<Props> = ({
  post,
  user,
  currentUid,
  commentsContent,
  isCommentsLoaded,
  handleSubmit
}) => {
  let { date, ...postData } = post
  let { username, avatar } = user

  return (
    <Layout>
      <PostCard
        username={username}
        avatar={avatar}
        date={new Date(post.date).toDateString()}
        {...postData}
        currentUid={currentUid}
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
