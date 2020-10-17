import React from 'react'
import { firebaseAPI } from '../api'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Routes from '../constants/routes'
import { AuthUser } from '../typings'

const withAuthorization = (
  condition: (authUser: AuthUser) => boolean,
  path: string = Routes.SIGN_IN
) => <BaseProps extends {}>(Component: React.ComponentType<BaseProps>) => {
  interface Props extends RouteComponentProps {}

  class WithAuthorization extends React.Component<Props> {
    private listener: any

    componentDidMount() {
      this.listener = firebaseAPI.onAuthStateChanged((authUser: AuthUser) => {
        if (condition(authUser)) {
          this.props.history.push(path)
        }
      })
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      const { history, location, match, ...restProps } = this.props

      return <Component {...(restProps as BaseProps)} />
    }
  }

  return withRouter(WithAuthorization)
}

export default withAuthorization
