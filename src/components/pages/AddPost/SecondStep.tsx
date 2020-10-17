import React from 'react'
import { Avatar, TextField } from '@material-ui/core'

import styles from './style.module.scss'

interface Props {
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  image: string | null
}

const SecondStep: React.FC<Props> = ({
  description,
  setDescription,
  image
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!event) {
      let description = event.target.value
      setDescription(description)
    }
  }

  return (
    <div className={styles.secondStep}>
      <div>
        <Avatar
          className={styles.image}
          variant="square"
          src={image ? image : ''}
        />
      </div>
      <div>
        <TextField
          className={styles.input}
          id="outlined-textarea"
          label="Description"
          placeholder="Add your description to post"
          multiline
          variant="outlined"
          fullWidth
          value={description}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default SecondStep
