import React from 'react'
import { Button } from '@material-ui/core'

import styles from './style.module.scss'

interface Props {
  title?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton: React.FC<Props> = ({ title, onChange }) => {
  return (
    <>
      <input
        accept="image/*"
        className={styles.input}
        id="contained-button-file"
        type="file"
        onChange={onChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          {title ? title : 'Upload'}
        </Button>
      </label>
    </>
  )
}

export default UploadButton
