import { database, getCurrentUser } from '../api/firebase'
import { Post, User } from '../typings'

const usersRef = database.ref('users')
const postsRef = database.ref('posts')
const userPostsRef = database.ref('user_posts')
// const postCommentsRef = database.ref('post_comments')

const users = {
  create: (user: User) => {
    const uid = getCurrentUser()?.uid
    const tempUser = { ...user }
    tempUser.uid = uid

    usersRef.push(uid).set(tempUser)
  },
  update: (user: User) => {
    const uid = getCurrentUser()?.uid
    if (!!uid) usersRef.child(uid).update(user)
  },
  on: (
    eventType: firebase.database.EventType,
    callback: (
      a: firebase.database.DataSnapshot,
      b?: string | null | undefined
    ) => any
  ) => {
    usersRef.on(eventType, callback)
  },
  off: () => {
    usersRef.off()
  }
}

const posts = {
  create: async (post: Post) => {
    const uid = getCurrentUser()?.uid
    const newPostKey = database.ref().child('posts').push().key

    let tempPost = { ...post }
    tempPost.id = newPostKey
    tempPost.uid = uid

    const updates: any = {}
    updates[`/posts/${newPostKey}`] = tempPost
    updates[`/user_posts/${uid}/${newPostKey}`] = tempPost
    // updates[postsRef.child(newPostKey)] = tempPost
    // updates[userPostsRef.child(uid).child(newPostKey)] = tempPost

    await database.ref().update(updates)
  },
  on: (
    eventType: firebase.database.EventType,
    callback: (
      a: firebase.database.DataSnapshot,
      b?: string | null | undefined
    ) => any
  ) => {
    postsRef.on(eventType, callback)
  },
  off: () => {
    postsRef.off()
  },
  delete: (id: string) => {
    const uid = getCurrentUser()?.uid

    postsRef.child(id).remove()
    if (!!uid) userPostsRef.child(uid).child(id).remove()
  }

  // TODO: likes transaction
}

const userPosts = {
  on: (
    uid: string,
    eventType: firebase.database.EventType,
    callback: (
      a: firebase.database.DataSnapshot,
      b?: string | null | undefined
    ) => any
  ) => {
    userPostsRef.child(uid).on(eventType, callback)
  },
  off: (uid: string) => {
    userPostsRef.child(uid).off()
  }
}

// TODO
// const postComments = {
//   create: () => {},
//   on: () => {},
//   off: () => {},
//   delete: () => {}
// }

export { users, posts, userPosts }
