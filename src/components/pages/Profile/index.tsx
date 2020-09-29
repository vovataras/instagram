import React, { useState } from 'react'
import { AuthUser, PostArray, User } from '../../../typings'
import withAuthorization from '../../../hocs/withAuthorization'
import { RootState } from '../../../redux/store'
import { connect, ConnectedProps } from 'react-redux'
import ProfileView from './view'
import LayoutPreloader from '../../modules/LayoutPreloader'
import EditProfile, { FormValues } from './EditProfile'
import { FormikHelpers } from 'formik'
import { users as usersServices } from '../../../services/database'
import imageCompression from 'browser-image-compression'
import { putAvatar } from '../../../services/storage'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Routes from '../../../constants/routes'
import PostCard from '../../modules/PostCard'
import { posts as postsServices } from '../../../services/database'
import { Paper } from '@material-ui/core'
import { userPosts as userPostsServices } from '../../../services/database'

import styles from './style.module.scss'

interface Props extends PropsFromRedux, RouteComponentProps<{ id?: string }> {}

const Profile: React.FC<Props> = ({
  user,
  isUsersLoaded,
  users,
  isUserPostsLoaded,
  userPostsError,
  userPosts,
  match,
  history
}) => {
  const [open, setOpen] = useState(false)
  const [imgFile, setImgFile] = useState(null as File | null)
  const [posts, setPosts] = useState(null as PostArray | null)
  const [postsError, setPostsError] = useState(null as string | null)
  const [isPostsLoaded, setIsPostsLoaded] = useState(false)

  const profileID = match.params.id
  let isOwner = false

  if (profileID) {
    userPostsServices.once(profileID, 'value', (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setPosts(data as PostArray)
      } else {
        setPostsError('No data available!')
      }
      setIsPostsLoaded(true)
    })
  }

  if (!isUsersLoaded || !isUserPostsLoaded || (profileID && !isPostsLoaded)) {
    return <LayoutPreloader />
  }
  if (
    !user ||
    !users
    // || !userPosts || (profileID && !posts)
  )
    return null

  const handleSettingsClick = () => {
    setOpen(true)
  }

  let userData: User | undefined = undefined

  if (profileID) {
    userData = users[profileID]
    isOwner = user.uid === profileID
  } else {
    userData = users[user.uid]
    isOwner = true
  }

  if (!userData) {
    history.push(Routes.PAGE404)
  }

  // !################################################

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

    const uploadPhoto = async () => {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 500,
        useWebWorker: true
      }
      const compressedFile = await imageCompression(imgFile!, options)

      const uploadTask = putAvatar(compressedFile)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        },
        (error) => {
          console.error(error)
        },
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()
          newUserData.avatar = downloadURL

          checkValues()
          usersServices.update(newUserData)
        }
      )
    }

    if (imgFile) {
      await uploadPhoto()
    } else {
      checkValues()

      if (Object.keys(newUserData).length !== 0) {
        usersServices.update(newUserData)
      }
    }
    formikHelpers.setSubmitting(false)
    setImgFile(null)
    setOpen(false)
  }

  // !################################################

  let content: JSX.Element[] | JSX.Element | null = null

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

      return (
        <PostCard
          key={value[0]}
          currentUid={currentUID}
          {...postData}
          username={username}
          avatar={avatar}
          date={dateStr}
          handleLikeClick={handleLikeClick}
          handleCommentClick={handleCommentClick}
          showSettings={isOwner}
          handleRemove={handleRemove}
        />
      )
    })

    return content
  }

  if (isOwner) {
    if (userPostsError) {
      content = <Paper className={styles.errorPaper}>{userPostsError}</Paper>
    } else {
      content = getContent(userPosts!, user.uid, true)
    }
  } else {
    if (postsError) {
      content = <Paper className={styles.errorPaper}>{postsError}</Paper>
    } else {
      content = getContent(posts!, user.uid, false)
    }
  }

  // !################################################

  // TODO: refactor

  return (
    <>
      <ProfileView
        username={userData?.username}
        avatar={userData?.avatar ? userData?.avatar : undefined}
        description={userData?.description}
        content={content!}
        // user={user}
        // posts={posts!}
        // users={users!}
        // postsError={postsError}
        handleSettingsClick={handleSettingsClick}
      />
      <EditProfile
        usernameVal={userData?.username}
        descriptionVal={userData?.description}
        open={open}
        setOpen={setOpen}
        imgFile={imgFile}
        setImgFile={setImgFile}
        handleSubmit={handleFormSubmit}
      />
    </>
  )
}

let mapState = (state: RootState) => ({
  user: state.auth.user,
  isUsersLoaded: state.users.isLoaded,
  users: state.users.items,
  isUserPostsLoaded: state.userPosts.isLoaded,
  userPostsError: state.userPosts.error,
  userPosts: state.userPosts.items
})

const connector = connect(mapState, {})

type PropsFromRedux = ConnectedProps<typeof connector>

const condition = (authUser: AuthUser) => !authUser

export default withAuthorization(condition)(connector(withRouter(Profile)))
