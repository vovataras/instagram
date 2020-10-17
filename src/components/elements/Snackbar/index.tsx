import React from 'react'
import { Snackbar as MaterialSnackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

interface Props {
  message?: string
  open?: boolean
  handleClose?: (
    event?: React.SyntheticEvent<Element, Event> | undefined,
    reason?: string | undefined
  ) => void
}

const Snackbar: React.FC<Props> = ({ message, open, handleClose }) => {
  return (
    <MaterialSnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={'error'}
        onClose={handleClose}
      >
        {message}
      </MuiAlert>
    </MaterialSnackbar>
  )
}

export default Snackbar
