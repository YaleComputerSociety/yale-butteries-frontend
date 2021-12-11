import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import Default from '../../layouts/Default'

const Inner: FC = () => {
  return (
    <div>
      <input type="text" name="user" placeholder="Username" />
      <input type="text" name="password" placeholder="Password" />
      <NavLink to={'/intramurals'}>
        <button>{'Login'}</button>
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
