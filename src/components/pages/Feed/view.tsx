import React from 'react'
import {
  CommentArray,
  CommentsObject,
  PostArray,
  UsersObject
} from '../../../typings'
import Layout from '../../modules/Layout'
import PostWithComments from '../../modules/PostWithComments'
import ErrorPaper from '../../elements/ErrorPaper'

import styles from './style.module.scss'

interface Props {
  posts: PostArray
  users: UsersObject
  comments?: CommentsObject | null
  currentUid: string
}

const FeedView: React.FC<Props> = ({ posts, users, currentUid, comments }) => {
  let content: JSX.Element[] | JSX.Element | null = null

  content = posts.map((value) => {
    if (value[1]) {
      let postComments: CommentArray | undefined = undefined
      if (comments) {
        postComments = comments[value[1].id!]
      }
      return (
        <PostWithComments
          key={value[0]}
          currentUID={currentUid}
          post={value[1]}
          users={users}
          postComments={postComments}
        />
      )
    } else {
      return <ErrorPaper error="Post data is unavailable" />
    }
  })

  return (
    <Layout maxWidth="md">
      <div className={styles.feed}>{content}</div>
    </Layout>
  )
}

export default FeedView
