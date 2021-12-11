import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'

// Interface for NavTab Component.
interface NavTabProps {
  linkStr: string
  displayStr: string
}

/**
 * @param {string} linkStr The link to route to.
 * @param {string} displayStr The string to be displayed in the Navbar.
 * @returns A tab of the Navbar, changing style properties when active link.
 */
const NavTab = ({ linkStr, displayStr }: NavTabProps) => (
  <NavLink activeClassName={styles.activeTab} className={styles.tab} to={linkStr}>
    {displayStr}
  </NavLink>
)

// Navbar to navigate through the App.
export const Navigation: FC = () => {
  return (
    <div className={styles.navbar}>
      <NavTab linkStr={'/dashboard'} displayStr={'Dashboard'} />
      <NavTab linkStr={'/events'} displayStr={'Events'} />
      <NavTab linkStr={'/intramurals'} displayStr={'Intramurals'} />
      <NavTab linkStr={'/sign_up'} displayStr={'Signup'}/>
      <NavTab linkStr={'/testing'} displayStr={'test components'} />
    </div>
  )
}

export default Navigation
