import React, { FC } from 'react'

import Default from 'layouts/Default'
import styles from './styles.module.scss'

const Inner: FC = () => {
  return(
    <div className={styles.events}>Dashboard logic</div>
  )
}

const Dashboard: FC = () => {
  return (
    <Default>
      <Inner />
    </Default>
  )
}

export default Dashboard 