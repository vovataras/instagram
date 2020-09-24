import React, { useState } from 'react'
import RegisterForm, { FormValues } from './RegisterForm'
import AuthPage from '../../modules/AuthPage'
import Routes from '../../../constants/routes'
import { AuthUser } from '../../../typings'
import withAuthorization from '../../../hocs/withAuthorization'
import { FormikHelpers } from 'formik'
import { signUp } from '../../../services/auth'

const Register = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    let result = await signUp(values.username, values.email, values.password)
    if (!result.success) {
      setMessage(result.errorMessage)
      setOpen(true)
      formikHelpers.setSubmitting(false)
      formikHelpers.resetForm()
    }
  }

  return (
    <AuthPage
      linkTo={Routes.SIGN_IN}
      linkMessage="Already have an account? Sign in"
      alertOpen={open}
      alertMessage={message}
      alertHandleClose={handleClose}
    >
      <RegisterForm handleSubmit={handleSubmit} />
    </AuthPage>
  )
}

const condition = (authUser: AuthUser) => !!authUser

export default withAuthorization(condition, Routes.FEED)(Register)
