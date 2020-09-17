import React from 'react'
import Header from '../Header'
import Container from '@material-ui/core/Container'
import styles from './style.module.scss'

interface Props {
  children?: React.ReactNode
  maxWidth?: 'md' | 'xs' | 'sm' | 'lg' | 'xl'
}

const Layout: React.FC<Props> = ({ children, maxWidth }) => {
  return (
    <div>
      <Header />
      <Container
        maxWidth={maxWidth ? maxWidth : 'md'}
        className={styles.paddings}
      >
        <>{children}</>
      </Container>
    </div>
  )
}

export default Layout
