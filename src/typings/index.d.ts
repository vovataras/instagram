export type AuthUser = firebase.User | null

export interface User {
  uid?: string
  username?: string
  avatar?: string | null
  description?: string | null
}

export interface Post {
  id?: string | null
  uid?: string
  image: string
  description: string | null
  date: Date
  likesCount: number
  commentsCount: number
}
