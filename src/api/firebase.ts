import firebase from 'firebase'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
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

export const getCurrentUser = () => auth.currentUser

export const database = app.database()

const firebaseAPI = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getCurrentUser,
  database
}

export default firebaseAPI
