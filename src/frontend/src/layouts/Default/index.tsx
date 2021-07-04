import React, { FC } from 'react'

import Navigation from '../components/Navigation'

import styles from './styles.module.scss'

/*
  Amy, this is where you add your logic! Make sure to keep the navigation component there
  where you want June's navbar to show up.
*/

const Default: FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.title}>
        <h1>{'Branford Hub'}</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.naviagtionBar}>
          <Navigation />
        </div>
        <div className={styles.siteLayoutWrapper}>
          <div className={styles.siteLayoutContent}>{children}</div>
        </div>
      </div>
      <div className={styles.footer}>
        <h5>{'Yale Research Registry ©2021 Created by YCS'}</h5>
      </div>
    </div>
  )
}
export default Default
