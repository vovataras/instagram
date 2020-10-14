enum ActionsTypes {
  AUTH_USER = 'auth/AUTH_USER',
  SIGN_OUT_USER = 'auth/SIGN_OUT_USER'
}

type AuthUser = {
  type: typeof ActionsTypes.AUTH_USER
  user: firebase.User
}

type SignOutUser = {
  type: typeof ActionsTypes.SIGN_OUT_USER
}

type Actions = AuthUser | SignOutUser

export { ActionsTypes }
export type { AuthUser, SignOutUser, Actions }
