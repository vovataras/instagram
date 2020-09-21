enum ActionsTypes {
  AUTH_USER = 'auth/AUTH_USER',
  SIGN_OUT_USER = 'auth/SIGN_OUT_USER'
}

type AuthUser = {
  type: typeof ActionsTypes.AUTH_USER
  user: firebase.User
}
const authUser = (user: firebase.User): AuthUser => ({
  type: ActionsTypes.AUTH_USER,
  user
})

type SignOutUser = {
  type: typeof ActionsTypes.SIGN_OUT_USER
}
const signOutUser = (): SignOutUser => ({
  type: ActionsTypes.SIGN_OUT_USER
})

export const verifyAuth = (user: firebase.User | null) => (dispatch: any) => {
  if (user) {
    dispatch(authUser(user))
  } else {
    dispatch(signOutUser())
  }
}

type Actions = AuthUser | SignOutUser

export { ActionsTypes }
export type { Actions }
