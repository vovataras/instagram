import app from 'firebase/app'
import 'firebase/auth'
import { FIREBASE_CONFIG } from '../config'

const config = FIREBASE_CONFIG

app.initializeApp(config)
const auth = app.auth()

export const createUserWithEmailAndPassword = (
  email: string,
  password: string
) => auth.createUserWithEmailAndPassword(email, password)

export const signInWithEmailAndPassword = (email: string, password: string) =>
  auth.signInWithEmailAndPassword(email, password)

export const signOut = () => auth.signOut()

export const onAuthStateChanged = (
  nextOrObserver: firebase.Observer<any> | ((a: firebase.User | null) => any),
  error?: (a: firebase.auth.Error) => any,
  completed?: firebase.Unsubscribe
) => auth.onAuthStateChanged(nextOrObserver, error, completed)

const firebaseAPI = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
}

export default firebaseAPI
