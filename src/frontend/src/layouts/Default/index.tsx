import React, { FC } from 'react'

import Navigation from '../components/Navigation'

/*
  Amy, this is where you add your logic! Make sure to keep the navigation component there
  where you want June's navbar to show up.
*/

const Default: FC = ({children}) => {
  return(
    <div>
      <Navigation />
      <div>{children}</div>
    </div>
  )
}
export default Default