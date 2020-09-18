import React from 'react'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AddCommentIcon from '@material-ui/icons/AddComment'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import styles from './style.module.scss'

interface Props {
  username: string
  avatar?: string
  image: string
  imageAlt?: string
  description?: string
  date?: string
  likesCount: number
  commentsCount: number
}

const PostCard: React.FC<Props> = ({
  username,
  avatar,
  image,
  imageAlt,
  description,
  date,
  likesCount,
  commentsCount,
  ...props
}) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            aria-label={username.toLowerCase()}
            alt={username}
            src={avatar}
          >
            {username[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader={date}
      />
      <CardMedia className={styles.media} image={image} title={imageAlt} />
      {description && (
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      )}
      <CardActions>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        {likesCount}
        <IconButton aria-label="comment">
          <AddCommentIcon />
        </IconButton>
        {commentsCount}
      </CardActions>
    </Card>
  )
}

export default PostCard