import { getCurrentUser, database, storage } from './../api/firebase'

const dbImagesRef = database.ref('images')
const storageImagesRef = storage.ref('images')

const dbAvatarsRef = database.ref('avatars')
const storageAvatarsRef = storage.ref('avatars')

const putImage = (
  data: Blob | Uint8Array | ArrayBuffer,
  metadata?: firebase.storage.UploadMetadata | undefined
): firebase.storage.UploadTask => {
  const uid = getCurrentUser()?.uid
  const newImageKey = dbImagesRef.push().key

  return storageImagesRef.child(uid!).child(newImageKey!).put(data, metadata)
}

const putAvatar = (
  data: Blob | Uint8Array | ArrayBuffer,
  metadata?: firebase.storage.UploadMetadata | undefined
): firebase.storage.UploadTask => {
  const uid = getCurrentUser()?.uid
  const newAvatarKey = dbAvatarsRef.push().key

  return storageAvatarsRef.child(uid!).child(newAvatarKey!).put(data, metadata)
}

export { putImage, putAvatar }
