import React from 'react'
import RegisterForm from './RegisterForm'
import AuthPage from '../../modules/AuthPage'
import Routes from '../../../constants/routes'
import { AuthUser } from '../../../typings'
import withAuthorization from '../../../hocs/withAuthorization'

const Register = () => {
  return (
    <AuthPage
      linkTo={Routes.SIGN_IN}
      linkMessage="Already have an account? Sign in"
    >
      <RegisterForm />
    </AuthPage>
  )
}

const condition = (authUser: AuthUser) => !!authUser

export default withAuthorization(condition, Routes.FEED)(Register)
