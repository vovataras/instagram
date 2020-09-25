import React from 'react'
import Preloader from '../../elements/Preloader'
import PostCard from '../../modules/PostCard'

import styles from './style.module.scss'

interface Props {
  username: string
  avatar?: string
  image: string
  description?: string
  isHandlingShare: boolean
}

const FinalStep: React.FC<Props> = (props) => {
  const { isHandlingShare, ...otherProps } = props

  return (
    <div className={styles.finalStep}>
      {isHandlingShare ? (
        <Preloader />
      ) : (
        <PostCard {...otherProps} postPreview />
      )}
    </div>
  )
}

export default FinalStep
