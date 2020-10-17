import React from 'react'
import { Button } from '@material-ui/core'

import styles from './style.module.scss'

interface Props {
  id?: string
  title?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton: React.FC<Props> = ({ id, title, onChange }) => {
  return (
    <>
      <input
        accept="image/*"
        className={styles.input}
        id={id ? id : 'contained-button-file'}
        type="file"
        onChange={onChange}
      />
      <label htmlFor={id ? id : 'contained-button-file'}>
        <Button variant="contained" color="primary" component="span">
          {title ? title : 'Upload'}
        </Button>
      </label>
    </>
  )
}

export default UploadButton
