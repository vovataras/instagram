import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import authReducer from './auth'
import appReducer from './app'

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export type RootState = ReturnType<typeof rootReducer>

export default store
