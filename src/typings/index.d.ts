export type AuthUser = firebase.User | null

export interface User {
  uid?: string
  username?: string
  avatar?: string | null
  description?: string | null
}

export interface UsersObject {
  [key: string]: User
}

export interface Post {
  id?: string | null
  uid?: string
  image: string | null
  description: string | null
  date: Date
  likesCount: number
  commentsCount: number
}

export type PostArray = Array<[string, Post]>
