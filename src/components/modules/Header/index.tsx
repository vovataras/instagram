import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tooltip,
  IconButton
} from '@material-ui/core'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import Routes from '../../../constants/routes'
import ProfileMenu from './ProfileMenu'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

const Header: React.FC<{}> = () => {
  return (
    <div className={styles.root}>
      <AppBar position="fixed">
        <Container maxWidth="md" className={styles.container}>
          <Toolbar disableGutters>
            <Tooltip title="Add new post" aria-label="add new post">
              <Link to={Routes.ADD_POST}>
                <IconButton color="inherit">
                  <AddAPhotoIcon />
                </IconButton>
              </Link>
            </Tooltip>
            <Typography variant="h6" className={styles.title}>
              <Link to={Routes.FEED}>Instagram</Link>
            </Typography>
            <ProfileMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Header
