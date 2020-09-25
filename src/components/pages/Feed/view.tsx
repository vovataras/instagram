import React from 'react'
import { Paper } from '@material-ui/core'
import { PostArray, UsersObject } from '../../../typings'
import Layout from '../../modules/Layout'
import PostCard from '../../modules/PostCard'

import styles from './style.module.scss'

interface Props {
  posts: PostArray
  users: UsersObject
  postsError?: string | null
}

const FeedView: React.FC<Props> = ({ posts, users, postsError }) => {
  let content: JSX.Element[] | JSX.Element | null = null

  if (postsError) {
    content = <Paper className={styles.errorPaper}>{postsError}</Paper>
  } else {
    content = posts.map((value) => {
      const postD = value[1]
      const { uid, date, ...postData } = postD

      const userData = users[uid!]
      const { username, avatar } = userData

      const dateStr = new Date(date).toDateString()

      return (
        <PostCard
          key={value[0]}
          username={username}
          avatar={avatar}
          {...postData}
          date={dateStr}
        />
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
