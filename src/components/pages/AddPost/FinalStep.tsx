import React from 'react'
import Preloader from '../../elements/Preloader'
import PostCard from '../../modules/PostCard'

import styles from './style.module.scss'

interface Props {
  username?: string
  avatar?: string
  image: string
  description?: string
  isHandlingShare: boolean
}

const FinalStep: React.FC<Props> = ({
  username,
  avatar,
  isHandlingShare,
  ...props
}) => {
  return (
    <div className={styles.finalStep}>
      {isHandlingShare ? (
        <Preloader />
      ) : (
        <PostCard {...props} username={username} avatar={avatar} postPreview />
      )}
    </div>
  )
}

export default FinalStep
