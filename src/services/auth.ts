import { firebaseAPI } from '../api'
import { users } from './database'
import { setUsername } from './user'

interface ResponseBase {
  success: true | false
}

interface SuccessResponse extends ResponseBase {
  success: true
}

interface ErrorResponse extends ResponseBase {
  success: false
  errorCode: number
  errorMessage: string
}

type Response = SuccessResponse | ErrorResponse

export const signUp = async (
  username: string,
  email: string,
  password: string
): Promise<Response> => {
  try {
    const userCredential = await firebaseAPI.createUserWithEmailAndPassword(
      email,
      password
    )
    setUsername(username)
    users.create({
      uid: userCredential.user?.uid,
      username: username,
      avatar: null,
      description: null
    })
    return { success: true }
  } catch (error) {
    let errorCode = error.code
    let errorMessage = error.message
    return { success: false, errorCode, errorMessage }
  }
}

export const signIn = async (
  email: string,
  password: string
): Promise<Response> => {
  try {
    await firebaseAPI.signInWithEmailAndPassword(email, password)
    return { success: true }
  } catch (error) {
    let errorCode = error.code
    let errorMessage = error.message
    return { success: false, errorCode, errorMessage }
  }
}

export const signOut = async (): Promise<Response> => {
  try {
    await firebaseAPI.signOut()
    return { success: true }
  } catch (error) {
    let errorCode = error.code
    let errorMessage = error.message
    return { success: false, errorCode, errorMessage }
  }
}
