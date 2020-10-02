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
import { Likes } from '../../../typings'
import PostSettings from './PostSettings'
import { Link } from 'react-router-dom'

import styles from './style.module.scss'

interface Props {
  profileLink?: string
  username?: string
  avatar?: string | null
  image: string
  imageAlt?: string
  description?: string | null
  date?: string
  likesCount?: number
  commentsCount?: number
  postPreview?: boolean
  showSettings?: boolean
  likes?: Likes
  currentUid?: string | null
  handleLikeClick?: () => void
  handleCommentClick?: () => void
  handleRemove?: () => void
}

const PostCard: React.FC<Props> = ({
  profileLink,
  username,
  avatar,
  image,
  imageAlt,
  description,
  date,
  likesCount,
  commentsCount,
  postPreview,
  showSettings,
  likes,
  currentUid,
  handleLikeClick,
  handleCommentClick,
  handleRemove,
  ...props
}) => {
  const Header = (
    <CardHeader
      avatar={
        <Avatar
          aria-label={username!.toLowerCase()}
          alt={username}
          src={avatar!}
        >
          {username![0].toUpperCase()}
        </Avatar>
      }
      action={showSettings && <PostSettings handleRemove={handleRemove} />}
      title={username}
      subheader={date}
    />
  )

  return (
    <Card>
      {profileLink ? <Link to={profileLink}>{Header}</Link> : Header}
      <CardMedia className={styles.media} image={image} title={imageAlt} />
      {description && (
        <CardContent classes={{root: styles.content}}>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      )}
      <CardActions>
        <IconButton aria-label="like" onClick={handleLikeClick}>
          <FavoriteIcon
            className={
              likes && currentUid && currentUid! in likes! ? styles.liked : ''
            }
          />
        </IconButton>
        {likesCount}
        {postPreview && '∞'}
        <IconButton aria-label="comment" onClick={handleCommentClick}>
          <AddCommentIcon />
        </IconButton>
        {/* {commentsCount}
        {postPreview && '∞'} */}
      </CardActions>
    </Card>
  )
}

export default PostCard
