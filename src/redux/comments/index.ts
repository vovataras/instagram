import { ActionsTypes, Actions } from './actions'
import { CommentsObject } from '../../typings'

let initialState = {
  isLoaded: false,
  items: null as CommentsObject | null,
  error: null as string | null
}
type InitialStateType = typeof initialState

const commentsReducer = (
  state = initialState,
  action: Actions
): InitialStateType => {
  switch (action.type) {
    case ActionsTypes.SET_COMMENTS:
      return {
        ...state,
        error: null,
        isLoaded: true,
        items: action.comments
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

export default commentsReducer
