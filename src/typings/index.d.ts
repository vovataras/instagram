import { RootState } from '../redux/store'

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

export { RootState }

export type AuthUser = firebase.User | null

export interface User {
  uid?: string
  username?: string
  avatar?: string | null
  description?: string
}

export interface UsersObject {
  [key: string]: User
}

export type Likes = { [key: string]: boolean | null } | null

export interface Post {
  id?: string | null
  uid?: string
  image: string
  description: string | null
  date: Date
  likes?: Likes
  likesCount: number
}

export type PostArray = Array<[string, Post]>

export interface Comment {
  id?: string
  postId?: string
  uid: string
  commentText: string
}

export type CommentArray = Array<[string, Comment]>

export interface CommentsObject {
  [key: string]: CommentArray
}
