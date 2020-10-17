import { getCurrentUser } from './../api/firebase'

const setUsername = (username: string) => {
  let user = getCurrentUser()
  user?.updateProfile({ displayName: username })
}

export { setUsername }
