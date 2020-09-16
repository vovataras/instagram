import React from 'react'
import LoginForm from './LoginForm'
import AuthPage from '../../modules/AuthPage'
import Routes from '../../../constants/routes'

const Login = () => {
  return (
    <AuthPage
      linkTo={Routes.SIGN_UP}
      linkMessage="Don't have an account? Sign Up"
    >
      <LoginForm />
    </AuthPage>
  )
}

export default Login
