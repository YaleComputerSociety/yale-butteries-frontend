import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import Default from '../../layouts/Default'

import styles from './styles.module.scss'

const Inner: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <input className={styles.input} type="text" name="user" placeholder="Username" />
      <input className={styles.input} type="text" name="password" placeholder="Password" />
      <NavLink to={'/intramurals'}>
        <button style={{ backgroundColor: 'blue', color: 'white' }}>{'Login'}</button>
      </NavLink>
    </div>
  )
}

const Login: FC = () => {
  return (
    <Default>
      <Inner />
    </Default>
  )
}

export default Login
