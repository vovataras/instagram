import { ActionsTypes, AuthUser, SignOutUser } from "./types"

const authUser = (user: firebase.User): AuthUser => ({
  type: ActionsTypes.AUTH_USER,
  user
})

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
