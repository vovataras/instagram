import { ActionsTypes, Actions } from './actions'
import { PostArray } from '../types'

let initialState = {
  isLoaded: false,
  items: null as Array<PostArray> | null,
  error: null as string | null
}
type InitialStateType = typeof initialState

const postsReducer = (
  state = initialState,
  action: Actions
): InitialStateType => {
  switch (action.type) {
    case ActionsTypes.SET_POSTS:
      return {
        ...state,
        isLoaded: true,
        items: action.posts
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

export default postsReducer
