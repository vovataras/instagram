import React from 'react'
import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Typography
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import styles from './style.module.scss'

interface Props {
  username: string
  avatar?: string
  comment: string
}

const Comment: React.FC<Props> = ({ username, avatar, comment }) => {
  return (
    <Card className={styles.comment}>
      <CardHeader
        className={styles.header}
        disableTypography
        avatar={
          <Avatar src={avatar} aria-label={username.toLowerCase()}>
            {username[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography className={styles.title} variant="body2">
            {username}
          </Typography>
        }
        subheader={
          <Typography
            className={styles.subheader}
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
