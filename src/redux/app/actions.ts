enum ActionsTypes {
  INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS',
  SET_THEME = 'app/SET_THEME'
}

type InitializedSuccess = {
  type: typeof ActionsTypes.INITIALIZED_SUCCESS
}
const initializedSuccess = (): InitializedSuccess => ({
  type: ActionsTypes.INITIALIZED_SUCCESS
})

export const initializeApp = () => (dispatch: any) => {
  dispatch(initializedSuccess())
}

type Actions = InitializedSuccess

export { ActionsTypes }
export type { Actions }
