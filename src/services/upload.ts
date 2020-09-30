import imageCompression from 'browser-image-compression'
import { putAvatar } from './storage'

const uploadPhoto = async (imgFile: File) => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 500,
    useWebWorker: true
  }
  const compressedFile = await imageCompression(imgFile!, options)

  const uploadTask = putAvatar(compressedFile)

  return new Promise<string | undefined>((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      },
      (error) => {
        console.error(error)
        reject()
      },
      async () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          resolve(downloadURL)
        })
      }
    )
  })
}

export { uploadPhoto }
