import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import authReducer from './auth'
import appReducer from './app'
import postsReducer from './posts'
import userPostsReducer from './userPosts'
import usersReducer from './users'
import commentsReducer from './comments'

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  posts: postsReducer,
  userPosts: userPostsReducer,
  users: usersReducer,
  comments: commentsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export type RootState = ReturnType<typeof rootReducer>

export default store
