import React from 'react'
import { Paper } from '@material-ui/core'
import { PostArray, UsersObject } from '../../../typings'
import Layout from '../../modules/Layout'
import PostCard from '../../modules/PostCard'
import ProfileCard from '../../modules/ProfileCard'
import { posts as postsServices } from '../../../services/database'

import styles from './style.module.scss'
import Routes from '../../../constants/routes'
import { useHistory } from 'react-router-dom'

interface Props {
  user: firebase.User
  users: UsersObject
  posts: PostArray
  postsError?: string | null
  handleSettingsClick?: () => void
}

const ProfileView: React.FC<Props> = ({
  user,
  users,
  posts,
  postsError,
  handleSettingsClick
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

      const handleLikeClick = () => {
        postsServices.toggleLike(postData.id!, uid!, uid!)
      }

      const handleCommentClick = () => {
        history.push(Routes.POST.replace(':id', postData.id!))
      }

      const handleRemove = () => {
        postsServices.delete(postData.id!)
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
          handleCommentClick={handleCommentClick}
          handleRemove={handleRemove}
        />
      )
    })
  }

  return (
    <Layout>
      <div className={styles.profile}>
        <ProfileCard
          username={
            users[user.uid].username ? users[user.uid].username! : 'NULL'
          }
          avatar={users[user.uid].avatar!}
          description={users[user.uid].description!}
          handleSettingsClick={handleSettingsClick}
        />
        {content}
      </div>
    </Layout>
  )
}

export default ProfileView
