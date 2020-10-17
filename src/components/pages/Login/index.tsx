import React, { useState } from 'react'
import LoginForm, { FormValues } from './LoginForm'
import AuthPage from '../../modules/AuthPage'
import Routes from '../../../constants/routes'
import withAuthorization from '../../../hocs/withAuthorization'
import { AuthUser } from '../../../typings'
import { FormikHelpers } from 'formik'
import { signIn } from '../../../services/auth'

const Login = () => {
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
    let result = await signIn(values.email, values.password)
    if (!result.success) {
      setMessage(result.errorMessage)
      setOpen(true)
      formikHelpers.setSubmitting(false)
    }
  }

  return (
    <AuthPage
      linkTo={Routes.SIGN_UP}
      linkMessage="Don't have an account? Sign Up"
      alertOpen={open}
      alertMessage={message}
      alertHandleClose={handleClose}
    >
      <LoginForm handleSubmit={handleSubmit} />
    </AuthPage>
  )
}

const condition = (authUser: AuthUser) => !!authUser

export default withAuthorization(condition, Routes.FEED)(Login)
