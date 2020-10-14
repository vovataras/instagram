import React from 'react'
import CommentBlock, { FormValues } from '../../modules/CommentBlock'
import Layout from '../../modules/Layout'
import PostCard from '../../modules/PostCard'
import { Post, User } from '../../../typings'
import { FormikHelpers } from 'formik'
import Routes from '../../../constants/routes'
import { Paper } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import styles from './style.module.scss'

interface Props {
  post: Post
  user: User
  currentUid?: string
  commentsContent: JSX.Element | JSX.Element[] | null
  isCommentsLoaded: boolean
  handleBackClick?: () => void
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
  handleBackClick,
  handleSubmit,
  handleLikeClick
}) => {
  let { date, ...postData } = post
  let { uid, username, avatar } = user

  const profileLink = Routes.PROFILE_ID.replace(':id', uid!)

  return (
    <Layout>
      <Paper className={styles.backBtn} onClick={handleBackClick}>
        <ArrowBackIosIcon fontSize="small" />
        Back
      </Paper>
      <PostCard
        profileLink={profileLink}
        username={username ? username : 'NULL'}
        avatar={avatar ? avatar : undefined}
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
