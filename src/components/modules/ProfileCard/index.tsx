import React from 'react'
import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  Tooltip,
  IconButton
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

import styles from './style.module.scss'

interface Props {
  username: string
  avatar?: string
  description?: string
  showSettings?: boolean
  handleSettingsClick?: () => void
}

const ProfileCard: React.FC<Props> = ({
  username,
  avatar,
  description,
  showSettings,
  handleSettingsClick,
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
          >
            {username![0].toUpperCase()}
          </Avatar>
        }
        action={
          showSettings && (
            <Tooltip title="Edit profile" aria-label="profile settings">
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleSettingsClick}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          )
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
