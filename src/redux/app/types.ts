enum ActionsTypes {
  INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS',
  SET_THEME = 'app/SET_THEME'
}

type InitializedSuccess = {
  type: typeof ActionsTypes.INITIALIZED_SUCCESS
}

type Actions = InitializedSuccess

export { ActionsTypes }
export type { InitializedSuccess, Actions }
