enum ActionsTypes {
  AUTH_USER = 'auth/AUTH_USER',
  SIGN_OUT_USER = 'auth/SIGN_OUT_USER'
}

type AuthUser = {
  type: typeof ActionsTypes.AUTH_USER
  user: firebase.User
  username: string | null
}
const authUser = (user: firebase.User, username: null | string): AuthUser => ({
  type: ActionsTypes.AUTH_USER,
  user,
  username
})

type SignOutUser = {
  type: typeof ActionsTypes.SIGN_OUT_USER
}
const signOutUser = (): SignOutUser => ({
  type: ActionsTypes.SIGN_OUT_USER
})

export const verifyAuth = (user: firebase.User | null) => (dispatch: any) => {
  if (user) {
    let username = user?.displayName
    dispatch(authUser(user, username))
  } else {
    dispatch(signOutUser())
  }
}

type Actions = AuthUser | SignOutUser

export { ActionsTypes }
export type { Actions }
