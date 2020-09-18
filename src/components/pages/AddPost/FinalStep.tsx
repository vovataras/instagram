import React from 'react'
import PostCard from '../../modules/PostCard'

import styles from './style.module.scss'

interface Props {
  username: string
  avatar?: string
  image: string
  description?: string
}

const FinalStep: React.FC<Props> = (props) => {
  return (
    <div className={styles.finalStep}>
      <PostCard {...props} postPreview />
    </div>
  )
}

export default FinalStep
