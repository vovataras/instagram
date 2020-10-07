import React from 'react'
import { Card, CardMedia } from '@material-ui/core'
import UploadButton from '../../elements/UploadButton'

import styles from './style.module.scss'

interface Props {
  image: string | null
  imgError: string | null
  setImage: React.Dispatch<React.SetStateAction<string | null>>
  setImgFile: React.Dispatch<React.SetStateAction<File | null>>
  setImgError: React.Dispatch<React.SetStateAction<string | null>>
}

const FirstStep: React.FC<Props> = ({
  image,
  imgError,
  setImage,
  setImgFile,
  setImgError
}) => {
  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!event) {
        const imgFile = event.target.files![0]

        let imageSrc = URL.createObjectURL(imgFile)
        setImage(imageSrc)

        setImgFile(imgFile)
      } else {
      setImgError('Error: Image file not found.')
    }
  }

  return (
    <div className={styles.firstStep}>
      <UploadButton title="Select photo" onChange={loadFile} />
      {!!image ? (
        <Card className={styles.card} square>
          <CardMedia className={styles.media} image={image} />
        </Card>
      ) : null}
      {imgError && <div className={styles.eventError}>{imgError}</div>}
    </div>
  )
}

export default FirstStep
