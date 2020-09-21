import { currentUser } from './../api/firebase'

const setUsername = (username: string) => {
  let user = currentUser()
  user?.updateProfile({ displayName: username })
}

export { setUsername }
