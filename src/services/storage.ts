import { getCurrentUser, database, storage } from './../api/firebase'

const dbImagesRef = database.ref('images')
const storageImagesRef = storage.ref('images')

const putImage = (
  data: Blob | Uint8Array | ArrayBuffer,
  metadata?: firebase.storage.UploadMetadata | undefined
): firebase.storage.UploadTask => {
  const uid = getCurrentUser()?.uid
  const newImageKey = dbImagesRef.push().key

  return storageImagesRef.child(uid!).child(newImageKey!).put(data, metadata)
}

export { putImage }
