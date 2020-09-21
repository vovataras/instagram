import React, { useState } from 'react'
import LoginForm from './LoginForm'
import AuthPage from '../../modules/AuthPage'
import Routes from '../../../constants/routes'
import withAuthorization from '../../../hocs/withAuthorization'
import { AuthUser } from '../../../typings'

const Login = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <AuthPage
      linkTo={Routes.SIGN_UP}
      linkMessage="Don't have an account? Sign Up"
      alertOpen={open}
      alertMessage={message}
      alertHandleClose={handleClose}
    >
      <LoginForm setOpen={setOpen} setMessage={setMessage} />
    </AuthPage>
  )
}

const condition = (authUser: AuthUser) => !!authUser

export default withAuthorization(condition, Routes.FEED)(Login)
