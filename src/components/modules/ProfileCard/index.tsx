import React from 'react'
import { Card, CardHeader, Avatar, Typography } from '@material-ui/core'

import styles from './style.module.scss'
import ProfileSettings from './ProfileSettings'

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
        action={<ProfileSettings />}
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
