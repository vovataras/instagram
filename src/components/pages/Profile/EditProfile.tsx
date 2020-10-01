import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import UploadButton from '../../elements/UploadButton'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'

import styles from './style.module.scss'

const SigninSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  description: Yup.string().min(1, 'Too Short!').max(50, 'Too Long!')
})

export interface FormValues {
  username: string
  description: string
}

interface Props {
  usernameVal?: string
  descriptionVal?: string
  open: boolean
  imgFile: File | null
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setImgFile: React.Dispatch<React.SetStateAction<File | null>>
  handleSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void
}

const EditProfile: React.FC<Props> = ({
  usernameVal,
  descriptionVal,
  open,
  imgFile,
  setOpen,
  setImgFile,
  handleSubmit
}) => {
  const initialValues: FormValues = {
    username: usernameVal ? usernameVal : '',
    description: descriptionVal ? descriptionVal : ''
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SigninSchema,
    onSubmit: handleSubmit
  })

  const handleClose = () => {
    setImgFile(null)
    formik.resetForm()
    setOpen(false)
  }

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur
  } = formik

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-profile-dialog-title"
    >
      <DialogTitle id="edit-profile-dialog-title">Edit profile</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <div>
            <span className={styles.avatarTextBefore}>Avatar:</span>
            <UploadButton
              id="avatar"
              onChange={(event) => {
                setImgFile(event.currentTarget.files![0])
              }}
            />
            <span className={styles.avatarTextAfter}>
              {!!imgFile && imgFile.name}
            </span>
          </div>
          <TextField
            margin="dense"
            id="username"
            label="Username"
            fullWidth
            onBlur={handleBlur('username')}
            error={!!(errors.username && touched.username)}
            helperText={
              errors.username && touched.username ? errors.username : null
            }
            onChange={handleChange}
            value={values.username}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            onBlur={handleBlur('password')}
            error={!!(errors.description && touched.description)}
            helperText={
              errors.description && touched.description
                ? errors.description
                : null
            }
            onChange={handleChange}
            value={values.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" disabled={isSubmitting}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditProfile
