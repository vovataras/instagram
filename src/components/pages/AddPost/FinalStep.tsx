import React from 'react'
import { User } from '../../../typings'
import Preloader from '../../elements/Preloader'
import PostCard from '../../modules/PostCard'

import styles from './style.module.scss'

interface Props {
  username: string
  avatar?: string
  image: string
  description?: string
  isHandlingShare: boolean
  user: firebase.User | null
}

const FinalStep: React.FC<Props> = ({ isHandlingShare, user, ...props }) => {
  const { displayName, photoURL } = user!

  return (
    <div className={styles.finalStep}>
      {isHandlingShare ? (
        <Preloader />
      ) : (
        <PostCard
          {...props}
          username={displayName!}
          avatar={photoURL!}
          postPreview
        />
      )}
    </div>
  )
}

export default FinalStep
