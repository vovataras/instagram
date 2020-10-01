import React from 'react'
import Layout from '../../modules/Layout'
import ProfileCard from '../../modules/ProfileCard'

import styles from './style.module.scss'

interface Props {
  username?: string
  avatar?: string
  description?: string
  content: JSX.Element | JSX.Element[] | null
  showSettings?: boolean
  handleSettingsClick?: () => void
}

const ProfileView: React.FC<Props> = ({
  username,
  avatar,
  description,
  content,
  showSettings,
  handleSettingsClick
}) => {
  return (
    <Layout>
      <div className={styles.profile}>
        <ProfileCard
          username={username ? username : 'NULL'}
          avatar={avatar}
          description={description}
          showSettings={showSettings}
          handleSettingsClick={handleSettingsClick}
        />
        {content}
      </div>
    </Layout>
  )
}

export default ProfileView
