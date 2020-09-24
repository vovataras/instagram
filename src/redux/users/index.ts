import { ActionsTypes, Actions } from './actions'
import { UsersObject } from '../../typings'

let initialState = {
  isLoaded: false,
  items: null as UsersObject | null,
  error: null as string | null
}
type InitialStateType = typeof initialState

const usersReducer = (
  state = initialState,
  action: Actions
): InitialStateType => {
  switch (action.type) {
    case ActionsTypes.SET_USERS:
      return {
        ...state,
        isLoaded: true,
        items: action.users
      }
    case ActionsTypes.SET_ERROR:
      return {
        ...state,
        isLoaded: true,
        error: action.error
      }
    case ActionsTypes.RESET_STATE:
      return {
        ...state,
        ...initialState
      }
    default:
      return state
  }
}

export default usersReducer
