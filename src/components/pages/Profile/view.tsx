import React from 'react'
import { PostArray, UsersObject } from '../../../typings'
import Layout from '../../modules/Layout'
import PostCard from '../../modules/PostCard'
import ProfileCard from '../../modules/ProfileCard'

import styles from './style.module.scss'

interface Props {
  user: firebase.User
  posts: PostArray | null
  users: UsersObject
}

const ProfileView: React.FC<Props> = ({ user, posts, users }) => {
  const postCards = posts
    ? posts.map((value) => {
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
            showSettings
          />
        )
      })
    : null

  return (
    <Layout>
      <div className={styles.profile}>
        <ProfileCard
          username={user?.displayName ? user.displayName : 'NULL'}
          avatar={users[user.uid].avatar!}
          description={users[user.uid].description!}
        />
        {postCards}
      </div>
    </Layout>
  )
}

export default ProfileView
