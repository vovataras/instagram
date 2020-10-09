import React from 'react'
import { CommentArray, Post, UsersObject } from '../../../typings'
import PostCard from '../PostCard'
import Comment from '../../elements/Comment'
import Routes from '../../../constants/routes'
import { Link, useHistory } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { posts as postsServices } from '../../../services/database'
import CommentForm, { FormValues } from '../CommentForm'
import { FormikHelpers } from 'formik'
import { Comment as CommentType } from '../../../typings'
import { comments as commentsServices } from '../../../services/database'

import styles from './style.module.scss'

interface Props {
  post: Post
  users: UsersObject
  currentUID: string
  postComments?: CommentArray
  showSettings?: boolean
  isProfilePage?: boolean
}

const PostWithComments: React.FC<Props> = ({
  post,
  users,
  currentUID,
  postComments,
  showSettings,
  isProfilePage
}) => {
  const history = useHistory()

  const { uid, date, ...postData } = post

  const userData = users[uid!]
  const { username, avatar } = userData

  const dateStr = new Date(date).toDateString()

  const profileLink = isProfilePage
    ? undefined
    : Routes.PROFILE_ID.replace(':id', uid!)

  const handleLikeClick = () => {
    postsServices.toggleLike(postData.id!, currentUID, uid!)
  }

  const handleCommentClick = () => {
    history.push(Routes.POST.replace(':id', postData.id!))
  }

  const handleRemove = () => {
    postsServices.delete(postData.id!)
  }

  const handleCommentSubmit = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const comment: CommentType = {
      uid: currentUID,
      commentText: values.comment
    }
    commentsServices.create(post.id!, comment)
    formikHelpers.setSubmitting(false)
    formikHelpers.resetForm()
  }

  let mappedComments: JSX.Element[] | JSX.Element | null = null
  const maxCommentsCount = 2

  let allCommentsCount: number | null = null

  if (postComments) {
    const restCount = postComments.length - maxCommentsCount

    if (restCount > 0) {
      allCommentsCount = postComments.length
    }

    let postCommentsCopy = [...postComments]
    postCommentsCopy.reverse()

    let sliced = postCommentsCopy.slice(0, maxCommentsCount)

    mappedComments = sliced.reverse().map((value) => {
      const commentsD = value[1]
      const { uid, commentText } = commentsD

      const userData = users[uid!]
      const { username, avatar } = userData

      return (
        <Comment
          key={value[0]}
          username={username!}
          avatar={avatar!}
          comment={commentText}
        />
      )
    })
  }

  return (
    <div className={styles.root}>
      <PostCard
        profileLink={profileLink}
        username={username}
        avatar={avatar}
        {...postData}
        date={dateStr}
        handleLikeClick={handleLikeClick}
        currentUid={currentUID}
        handleCommentClick={handleCommentClick}
        showSettings={showSettings}
        handleRemove={showSettings ? handleRemove : undefined}
      />
      {allCommentsCount && (
        <Link to={Routes.POST.replace(':id', postData.id!)}>
          <Paper className={styles.paperLink}>
            View all {allCommentsCount} comments
          </Paper>
        </Link>
      )}
      {mappedComments && (
        <div className={styles.comments}>{mappedComments}</div>
      )}
      <CommentForm handleSubmit={handleCommentSubmit} />
    </div>
  )
}

export default PostWithComments
