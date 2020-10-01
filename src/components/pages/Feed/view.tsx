import React from 'react'
import { Paper } from '@material-ui/core'
import {
  CommentArray,
  CommentsObject,
  PostArray,
  UsersObject
} from '../../../typings'
import Layout from '../../modules/Layout'
import PostCard from '../../modules/PostCard'
import { posts as postsServices } from '../../../services/database'
import { Link, useHistory } from 'react-router-dom'
import Routes from '../../../constants/routes'
import Comment from '../../elements/Comment'

import styles from './style.module.scss'

interface Props {
  posts: PostArray
  users: UsersObject
  comments?: CommentsObject | null
  postsError?: string | null
  currentUid?: string | null
}

const FeedView: React.FC<Props> = ({
  posts,
  users,
  postsError,
  currentUid,
  comments
}) => {
  let content: JSX.Element[] | JSX.Element | null = null
  const history = useHistory()

  if (postsError) {
    content = <Paper className={styles.errorPaper}>{postsError}</Paper>
  } else {
    content = posts.map((value) => {
      const postD = value[1]
      const { uid, date, ...postData } = postD

      const userData = users[uid!]
      const { username, avatar } = userData

      const dateStr = new Date(date).toDateString()

      const profileLink = Routes.PROFILE_ID.replace(':id', uid!)

      const handleLikeClick = () => {
        postsServices.toggleLike(postData.id!, currentUid!, uid!)
      }

      const handleCommentClick = () => {
        history.push(Routes.POST.replace(':id', postData.id!))
      }

      let mappedComments: JSX.Element[] | JSX.Element | null = null

      let postComments: CommentArray | null = null
      const maxCommentsCount = 2

      if (comments) {
        postComments = comments[postData.id!]
      }

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
        <div key={value[0]}>
          <PostCard
            profileLink={profileLink}
            username={username}
            avatar={avatar}
            {...postData}
            date={dateStr}
            handleLikeClick={handleLikeClick}
            currentUid={currentUid}
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
    })
  }

  return (
    <Layout maxWidth="md">
      <div className={styles.feed}>{content}</div>
    </Layout>
  )
}

export default FeedView
