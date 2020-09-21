import React from 'react'
import LoginForm from './LoginForm'
import AuthPage from '../../modules/AuthPage'
import Routes from '../../../constants/routes'
import withAuthorization from '../../../hocs/withAuthorization'
import { AuthUser } from '../../../typings'

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

const condition = (authUser: AuthUser) => !!authUser

export default withAuthorization(condition, Routes.FEED)(Login)
