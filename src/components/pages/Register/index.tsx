import React from 'react'
import RegisterForm from './RegisterForm'
import AuthPage from '../../modules/AuthPage'
import Routes from '../../../constants/routes'

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

export default Register
