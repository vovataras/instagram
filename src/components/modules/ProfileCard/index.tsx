import React from 'react'
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Typography
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

import styles from './style.module.scss'

interface Props {
  username: string
  avatar?: string
  description?: string
}

const ProfileCard: React.FC<Props> = ({
  username,
  avatar,
  description,
  ...props
}) => {
  return (
    <Card>
      <CardHeader
        className={styles.cardHeader}
        disableTypography
        avatar={
          <Avatar
            className={styles.avatar}
            aria-label={username.toLowerCase()}
            alt={username}
            src={avatar}
          />
        }
        action={
          <IconButton aria-label="settings">
            <EditIcon />
          </IconButton>
        }
        title={
          <Typography className={styles.title} variant="h4" component="h2">
            {username}
          </Typography>
        }
        subheader={
          <Typography
            className={styles.subheader}
            variant="body2"
            color="textSecondary"
          >
            {description}
          </Typography>
        }
      />
    </Card>
  )
}

export default ProfileCard
