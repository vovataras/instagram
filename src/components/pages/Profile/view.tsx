import React from 'react'
import { Paper } from '@material-ui/core'
import { PostArray, UsersObject } from '../../../typings'
import Layout from '../../modules/Layout'
import PostCard from '../../modules/PostCard'
import ProfileCard from '../../modules/ProfileCard'
import { posts as postsServices } from '../../../services/database'

import styles from './style.module.scss'

interface Props {
  user: firebase.User
  users: UsersObject
  posts: PostArray
  postsError?: string | null
}

const ProfileView: React.FC<Props> = ({ user, users, posts, postsError }) => {
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

      const handleLikeClick = () => {
        postsServices.toggleLike(postData.id!, uid!, uid!)
      }

      return (
        <PostCard
          key={value[0]}
          username={username}
          avatar={avatar}
          {...postData}
          date={dateStr}
          showSettings
          handleLikeClick={handleLikeClick}
          currentUid={uid}
        />
      )
    })
  }

  return (
    <Layout>
      <div className={styles.profile}>
        <ProfileCard
          username={user?.displayName ? user.displayName : 'NULL'}
          avatar={users[user.uid].avatar!}
          description={users[user.uid].description!}
        />
        {content}
      </div>
    </Layout>
  )
}

export default ProfileView
