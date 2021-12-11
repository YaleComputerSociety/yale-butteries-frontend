import React, { FC } from 'react'
import {NavLink} from  'react-router-dom'

import Signup_form from 'components/Signup_form/index'
import Selector from 'components/Mult-Select/index'


import Default from '../../layouts/Default'

const Inner: FC = () => {
  return <Signup_form></Signup_form>
}

const Signup: FC = () => {
  return (
    <Default>
      <Inner/>
    </Default>
  )
}

export default Signup