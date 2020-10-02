import React from 'react'
import { Avatar, Card, CardHeader, Typography } from '@material-ui/core'

import styles from './style.module.scss'

interface Props {
  username: string
  avatar?: string
  comment: string
  className?: string
}

const Comment: React.FC<Props> = ({ username, avatar, comment, className }) => {
  return (
    <Card className={`${styles.comment} ${className}`}>
      <CardHeader
        className={styles.header}
        disableTypography
        avatar={
          <Avatar src={avatar} aria-label={username.toLowerCase()}>
            {username[0].toUpperCase()}
          </Avatar>
        }
        title={
          <Typography className={styles.title} variant="body2">
            {username}
          </Typography>
        }
        subheader={
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {comment}
          </Typography>
        }
      />
    </Card>
  )
}

export default Comment
