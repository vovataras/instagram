import React, { useState, useEffect } from 'react'
import { AuthUser, CommentArray, PostArray, User } from '../../../typings'
import withAuthorization from '../../../hocs/withAuthorization'
import { RootState } from '../../../redux/store'
import { connect, ConnectedProps } from 'react-redux'
import ProfileView from './view'
import LayoutPreloader from '../../modules/LayoutPreloader'
import EditProfile, { FormValues } from './EditProfile'
import { FormikHelpers } from 'formik'
import { users as usersServices } from '../../../services/database'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import Routes from '../../../constants/routes'
import PostCard from '../../modules/PostCard'
import { posts as postsServices } from '../../../services/database'
import { Paper } from '@material-ui/core'
import { userPosts as userPostsServices } from '../../../services/database'
import { uploadPhoto } from '../../../services/upload'
import Comment from '../../elements/Comment'

import styles from './style.module.scss'

interface Props extends PropsFromRedux, RouteComponentProps<{ id?: string }> {}

const Profile: React.FC<Props> = ({
  user,
  isUsersLoaded,
  users,
  isUserPostsLoaded,
  userPostsError,
  userPosts,
  comments,
  match,
  history
}) => {
  const [open, setOpen] = useState(false)
  const [imgFile, setImgFile] = useState(null as File | null)
  const [postsState, setPostsState] = useState({
    isLoaded: false,
    items: null as PostArray | null,
    error: null as string | null
  })

  const profileID = match.params.id
  let isOwner = false
  let userData: User | undefined = undefined
  let content: JSX.Element[] | JSX.Element | null = null

  if (user) {
    isOwner = user.uid === profileID

    if (users) {
      if (profileID) {
        userData = users[profileID]
      } else {
        userData = users[user.uid]
        isOwner = true
      }
    }
  }

  useEffect(() => {
    if (profileID && !isOwner) {
      userPostsServices.on(profileID, 'value', (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          const entries = Object.entries(data)
          setPostsState({
            isLoaded: true,
            items: entries.reverse() as PostArray,
            error: null
          })
        } else {
          setPostsState({
            isLoaded: true,
            items: null,
            error: 'No posts yet.'
          })
        }
      })
    }

    return () => {
      if (profileID && !isOwner) {
        userPostsServices.off(profileID)
      }
    }
  }, [profileID, isOwner])

  if (
    !isUsersLoaded ||
    !isUserPostsLoaded ||
    (profileID && !isOwner && !postsState.isLoaded)
  ) {
    return <LayoutPreloader />
  }

  if (!user) return null

  if (!userData) {
    history.push(Routes.PAGE404)
  }

  const handleSettingsClick = () => {
    setOpen(true)
  }

  const handleFormSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const newUserData: User = {}

    const checkValues = () => {
      if (userData?.username !== values.username) {
        newUserData.username = values.username
      }
      if (userData?.description !== values.description) {
        newUserData.description = values.description
      }
    }

    if (imgFile) {
      let downloadURL = await uploadPhoto(imgFile)
      newUserData.avatar = downloadURL
      checkValues()
    } else {
      checkValues()
    }

    if (Object.keys(newUserData).length !== 0) {
      usersServices.update(newUserData)
    }

    formikHelpers.setSubmitting(false)
    setImgFile(null)
    setOpen(false)
  }

  const getContent = (
    posts: PostArray,
    currentUID: string,
    isOwner: boolean
  ) => {
    const content = posts.map((value) => {
      const postD = value[1]
      const { uid, date, ...postData } = postD
      const { username, avatar } = userData!
      const dateStr = new Date(date).toDateString()

      const handleLikeClick = () => {
        postsServices.toggleLike(postData.id!, currentUID, uid!)
      }

      const handleCommentClick = () => {
        history.push(Routes.POST.replace(':id', postData.id!))
      }

      const handleRemove = () => {
        postsServices.delete(postData.id!)
      }

      let mappedComments: JSX.Element[] | JSX.Element | null = null

      let postComments: CommentArray | null = null
      const maxCommentsCount = 2

      if (comments) {
        postComments = comments[postData.id!]
      }

      let allCommentsCount: number | null = null

      if (postComments) {
        const restCount = postComments.length - maxCommentsCount

        if (restCount > 0) {
          allCommentsCount = postComments.length
        } else {
          allCommentsCount = null
        }

        let postCommentsCopy = [...postComments]
        postCommentsCopy.reverse()

        let sliced = postCommentsCopy.slice(0, maxCommentsCount)

        let slicedCopy = [...sliced]
        slicedCopy.reverse()

        if (users) {
          mappedComments = slicedCopy.map((value) => {
            const commentsD = value[1]
            const { uid, commentText } = commentsD

            const userData = users[uid!]
            const { username, avatar } = userData

            return (
              <Comment
                key={value[0]}
                username={username!}
                avatar={avatar!}
                comment={commentText}
              />
            )
          })
        } else {
          mappedComments = null
        }
      }

      return (
        <div key={value[0]}>
          <PostCard
            // key={value[0]}
            currentUid={currentUID}
            {...postData}
            username={username}
            avatar={avatar}
            date={dateStr}
            handleLikeClick={handleLikeClick}
            handleCommentClick={handleCommentClick}
            showSettings={isOwner}
            handleRemove={isOwner ? handleRemove : undefined}
          />
          {allCommentsCount && (
            <Link to={Routes.POST.replace(':id', postData.id!)}>
              <Paper className={styles.paperLink}>
                View all {allCommentsCount} comments.
              </Paper>
            </Link>
          )}
          {mappedComments && (
            <div className={styles.comments}>{mappedComments}</div>
          )}
        </div>
      )
    })

    return content
  }

  const setContent = (
    error: string | null,
    posts: PostArray | null,
    isOwner: boolean
  ) => {
    if (error) {
      content = <Paper className={styles.errorPaper}>{error}</Paper>
    } else if (posts) {
      content = getContent(posts, user.uid, isOwner)
    }
  }

  if (isOwner) {
    setContent(userPostsError, userPosts, true)
  } else {
    setContent(postsState.error, postsState.items, false)
  }

  return (
    <>
      <ProfileView
        username={userData?.username}
        avatar={userData?.avatar ? userData?.avatar : undefined}
        description={userData?.description}
        content={content}
        showSettings={isOwner}
        handleSettingsClick={handleSettingsClick}
      />
      {isOwner && (
        <EditProfile
          usernameVal={userData?.username}
          descriptionVal={userData?.description}
          open={open}
          setOpen={setOpen}
          imgFile={imgFile}
          setImgFile={setImgFile}
          handleSubmit={handleFormSubmit}
        />
      )}
    </>
  )
}

let mapState = (state: RootState) => ({
  user: state.auth.user,
  isUsersLoaded: state.users.isLoaded,
  users: state.users.items,
  isUserPostsLoaded: state.userPosts.isLoaded,
  userPostsError: state.userPosts.error,
  userPosts: state.userPosts.items,
  comments: state.comments.items
})

const connector = connect(mapState, {})

type PropsFromRedux = ConnectedProps<typeof connector>

const condition = (authUser: AuthUser) => !authUser

export default withAuthorization(condition)(connector(withRouter(Profile)))
