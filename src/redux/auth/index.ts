import { ActionsTypes, Actions } from './actions'

let initialState = {
  isAuth: false,
  user: null as firebase.User | null,
  uid: null as string | null
}
type InitialStateType = typeof initialState

const authReducer = (
  state = initialState,
  action: Actions
): InitialStateType => {
  switch (action.type) {
    case ActionsTypes.AUTH_USER:
      return {
        ...state,
        isAuth: true,
        user: action.user,
        uid: action.user.uid
      }
    case ActionsTypes.SIGN_OUT_USER:
      return {
        ...state,
        isAuth: false,
        user: null,
        uid: null
      }
    default:
      return state
  }
}

export default authReducer
