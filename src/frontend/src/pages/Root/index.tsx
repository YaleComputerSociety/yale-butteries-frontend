import React, { FC } from 'react'
import { Redirect } from 'react-router-dom'

const DefaultRedirect: FC = () => {
  return <Redirect to="login" />
}

const Root: FC = () => {
  return (
    /* when we enable sign in:
      <Secure>
    */
    <DefaultRedirect />
    /* when we enable sign in:
      <Secure>
    */
  )
}

export default Root
