import React, { FC } from 'react'
import {NavLink} from 'react-router-dom'

/* June, this is where your logic goes!
I've just added an example of using the react router below to connect all the pages.
*/
export const Navigation: FC = () => {
  return (
    <div>
      <div>This is an example of the navigation bar with change!</div>
      <div>
        <NavLink to="/dashboard">{'Dashboard testing'}</NavLink>
        <NavLink to="/events">{'Events'}</NavLink>
        <NavLink to="/intramurals">{'Intramurals'}</NavLink>
      </div>
    </div>
  )
}

export default Navigation 