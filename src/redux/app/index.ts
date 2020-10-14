import { Actions, ActionsTypes } from "./types"

let initialState = {
  initialized: false
}
type InitialState = typeof initialState

const appReducer = (state = initialState, action: Actions): InitialState => {
  switch (action.type) {
    case ActionsTypes.INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      }
    default:
      return state
  }
}

export default appReducer
