import React from 'react'
import { CommentArray, Post, UsersObject } from '../../../typings'
import PostCard from '../PostCard'
import Comment from '../../elements/Comment'
import Routes from '../../../constants/routes'
import { Link, useHistory } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { posts as postsServices } from '../../../services/database'

import styles from './style.module.scss'

interface Props {
  post: Post
  users: UsersObject
  currentUID: string
  postComments?: CommentArray
}

const PostWithComments: React.FC<Props> = ({
  post,
  users,
  currentUID,
  postComments
}) => {
  const history = useHistory()

  const { uid, date, ...postData } = post

  const userData = users[uid!]
  const { username, avatar } = userData

  const dateStr = new Date(date).toDateString()

  const profileLink = Routes.PROFILE_ID.replace(':id', uid!)

  const handleLikeClick = () => {
    postsServices.toggleLike(postData.id!, currentUID, uid!)
  }

  const handleCommentClick = () => {
    history.push(Routes.POST.replace(':id', postData.id!))
  }

  let mappedComments: JSX.Element[] | JSX.Element | null = null
  const maxCommentsCount = 2

  let allCommentsCount: number | null = null

  if (postComments) {
    const restCount = postComments.length - maxCommentsCount

    if (restCount > 0) {
      allCommentsCount = postComments.length
    } else {
      allCommentsCount = null
    }

    let postCommentsCopy = [...postComments]
    postCommentsCopy.reverse()

    let sliced = postCommentsCopy.slice(0, maxCommentsCount)

    let slicedCopy = [...sliced]
    slicedCopy.reverse()

    mappedComments = slicedCopy.map((value) => {
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
      />
      {allCommentsCount && (
        <Link to={Routes.POST.replace(':id', postData.id!)}>
          <Paper className={styles.paperLink}>
            View all {allCommentsCount} comments.
          </Paper>
        </Link>
      )}
      {mappedComments && (
        <div className={styles.comments}>{mappedComments}</div>
      )}
    </div>
  )
}

export default PostWithComments
