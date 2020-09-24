import React from 'react'
import Preloader from '../../elements/Preloader'
import Layout from '../Layout'

import styles from './style.module.scss'

const LayoutPreloader = () => {
  return (
    <Layout>
      <div className={styles.layoutPreloader}>
        <Preloader />
      </div>
    </Layout>
  )
}

export default LayoutPreloader
