import React, { useState } from 'react'
import { AuthUser, User } from '../../../typings'
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

interface Props extends PropsFromRedux {}

const Profile: React.FC<Props> = ({
  user,
  isUsersLoaded,
  users,
  isPostsLoaded,
  postsError,
  posts
}) => {
  const [open, setOpen] = useState(false)
  const [imgFile, setImgFile] = useState(null as File | null)

  const handleSettingsClick = () => {
    setOpen(true)
  }

  let userData: User | undefined = undefined

  if (users && user) {
    userData = users![user!.uid]
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

  if (!user) return null
  if (!isUsersLoaded || !isPostsLoaded) return <LayoutPreloader />
  return (
    <>
      <ProfileView
        user={user}
        posts={posts!}
        users={users!}
        postsError={postsError}
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
  isPostsLoaded: state.userPosts.isLoaded,
  postsError: state.userPosts.error,
  posts: state.userPosts.items
})

const connector = connect(mapState, {})

type PropsFromRedux = ConnectedProps<typeof connector>

const condition = (authUser: AuthUser) => !authUser

export default withAuthorization(condition)(connector(Profile))
