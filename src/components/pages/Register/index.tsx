import React, { useState } from 'react'
import RegisterForm from './RegisterForm'
import AuthPage from '../../modules/AuthPage'
import Routes from '../../../constants/routes'
import { AuthUser } from '../../../typings'
import withAuthorization from '../../../hocs/withAuthorization'

const Register = () => {
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
      linkTo={Routes.SIGN_IN}
      linkMessage="Already have an account? Sign in"
      alertOpen={open}
      alertMessage={message}
      alertHandleClose={handleClose}
    >
      <RegisterForm setOpen={setOpen} setMessage={setMessage} />
    </AuthPage>
  )
}

const condition = (authUser: AuthUser) => !!authUser

export default withAuthorization(condition, Routes.FEED)(Register)
