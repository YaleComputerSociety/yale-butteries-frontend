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
        justifyContent: 'center',
        margin: '25vh',
      }}
    >
      {/* <div class="floating">
    <input id="input__username" class="floating__input" name="username" type="text" placeholder="Username" />
    <label for="input__username" class="floating__label" data-content="Username">
    <span class="hidden--visually">
      Username</span></label>
  </div> */}
      <div className={styles.floating}>
        <input
          id="input__username"
          className={styles.floatingInput}
          name="username"
          type="text"
          placeholder="Username"
        />
        <label htmlFor="input__username" className={styles.floatingLabel} data-content="Username">
          <span className={styles.hiddenVisually}>{'Username'}</span>
        </label>
      </div>
      <div className={styles.floating}>
        <input
          id="input__password"
          className={styles.floatingInput}
          name="password"
          type="text"
          placeholder="Password"
        />
        <label htmlFor="input__password" className={styles.floatingLabel} data-content="Password">
          <span className={styles.hiddenVisually}>{'Password'}</span>
        </label>
      </div>
      {/* <input className={styles.input} type="text" name="user" placeholder="Username" /> */}
      {/* <input className={styles.input} type="text" name="password" placeholder="Password" /> */}
      <NavLink to={'/sign_up'}>
        <button className={styles.inputButton}>{'Login'}</button>
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
