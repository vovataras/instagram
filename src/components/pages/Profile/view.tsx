import React from 'react'
import Layout from '../../modules/Layout'
import ProfileCard from '../../modules/ProfileCard'

import styles from './style.module.scss'

interface Props {
  username?: string
  avatar?: string
  description?: string
  content: JSX.Element | JSX.Element[]
  handleSettingsClick?: () => void

  // user: firebase.User
  // users: UsersObject
  // posts: PostArray
  // postsError?: string | null
}

const ProfileView: React.FC<Props> = ({
  username,
  avatar,
  description,
  content,
  handleSettingsClick

  // user,
  // users,
  // posts,
  // postsError,
}) => {
  // let content: JSX.Element[] | JSX.Element | null = null
  // const history = useHistory()

  // if (postsError) {
  //   content = <Paper className={styles.errorPaper}>{postsError}</Paper>
  // } else {
  //   content = posts.map((value) => {
  //     const postD = value[1]
  //     const { uid, date, ...postData } = postD

  //     const userData = users[uid!]
  //     const { username, avatar } = userData

  //     const dateStr = new Date(date).toDateString()

  //     const handleLikeClick = () => {
  //       postsServices.toggleLike(postData.id!, uid!, uid!)
  //     }

  //     const handleCommentClick = () => {
  //       history.push(Routes.POST.replace(':id', postData.id!))
  //     }

  //     const handleRemove = () => {
  //       postsServices.delete(postData.id!)
  //     }

  //     return (
  //       <PostCard
  //         key={value[0]}
  //         username={username}
  //         avatar={avatar}
  //         {...postData}
  //         date={dateStr}
  //         showSettings
  //         handleLikeClick={handleLikeClick}
  //         currentUid={uid}
  //         handleCommentClick={handleCommentClick}
  //         handleRemove={handleRemove}
  //       />
  //     )
  //   })
  // }

  return (
    <Layout>
      <div className={styles.profile}>
        <ProfileCard
          username={username ? username : 'NULL'}
          avatar={avatar}
          description={description}
          handleSettingsClick={handleSettingsClick}
        />
        {content}
      </div>
    </Layout>
  )
}

export default ProfileView
