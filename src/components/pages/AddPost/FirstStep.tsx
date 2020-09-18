import React from 'react'
import { Card, CardMedia } from '@material-ui/core'
import UploadButton from '../../elements/UploadButton'

import styles from './style.module.scss'

interface Props {
  image: string | null
  setImage: React.Dispatch<React.SetStateAction<string | null>>
}

const FirstStep: React.FC<Props> = ({ image, setImage }) => {
  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!event) {
      let imageSrc = URL.createObjectURL(event.target.files![0])
      setImage(imageSrc)
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
    </div>
  )
}

export default FirstStep
