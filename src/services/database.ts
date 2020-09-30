import { database, getCurrentUser } from '../api/firebase'
import { Post, User, Comment, PostArray } from '../typings'

const usersRef = database.ref('users')
const postsRef = database.ref('posts')
const userPostsRef = database.ref('user_posts')
const commentsRef = database.ref('comments')

const users = {
  create: (user: User) => {
    const uid = getCurrentUser()?.uid
    const tempUser = { ...user }
    tempUser.uid = uid

    if (!!uid) usersRef.child(uid).set(tempUser)
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
  },
  toggleLike: (postId: string, uid: string, postUid: string) => {
    const toggle = (post: Post) => {
      if (post) {
        if (post.likes && post.likes[uid]) {
          post.likesCount--
          post.likes[uid] = null
        } else {
          post.likesCount++
          if (!post.likes) {
            post.likes = {}
          }
          post.likes[uid] = true
        }
      }
      return post
    }

    postsRef.child(postId).transaction(toggle)
    userPostsRef.child(postUid).child(postId).transaction(toggle)
  }
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
  getPosts: async (uid: string) => {
    let entries: PostArray | null = null
    let snapshot = await userPostsRef.child(uid).once('value')

    if (snapshot.exists()) {
      const data = snapshot.val()
      const _entries = Object.entries(data)
      entries = _entries.reverse() as PostArray
    }
    return entries
  },
  off: (uid: string) => {
    userPostsRef.child(uid).off()
  }
}

const comments = {
  create: (postId: string, comment: Comment) => {
    commentsRef.child(postId).push(comment)
  },
  on: (
    postId: string,
    eventType: firebase.database.EventType,
    callback: (
      a: firebase.database.DataSnapshot,
      b?: string | null | undefined
    ) => any
  ) => {
    commentsRef.child(postId).on(eventType, callback)
  },
  off: (postId: string) => {
    commentsRef.child(postId).off()
  }
  // TODO
  // delete: (postId: string, commentId: string) => {}
}

export { users, posts, userPosts, comments }
