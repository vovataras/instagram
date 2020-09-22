import React, { useState } from 'react'
import { IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

const ProfileSettings = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Tooltip title="Edit..." aria-label="profile settings">
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Username</MenuItem>
        <MenuItem>Avatar</MenuItem>
        <MenuItem>Status</MenuItem>
      </Menu>
    </div>
  )
}

export default ProfileSettings
