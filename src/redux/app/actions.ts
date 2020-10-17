import { ActionsTypes, InitializedSuccess } from "./types"

const initializedSuccess = (): InitializedSuccess => ({
  type: ActionsTypes.INITIALIZED_SUCCESS
})

export const initializeApp = () => (dispatch: any) => {
  dispatch(initializedSuccess())
}
