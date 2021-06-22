import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'

/* June, this is where your logic goes!
I've just added an example of using the react router below to connect all the pages.
*/
export const Navigation: FC = () => {
  return (
    <div className={styles.navbar}>
      <NavLink to="/dashboard">{'Dashboard'}</NavLink>
      <NavLink to="/events">{'Events'}</NavLink>
      <NavLink to="/intramurals">{'Intramurals'}</NavLink>
      <NavLink to="/testing">{'test components'}</NavLink>
    </div>
  )
}

export default Navigation
