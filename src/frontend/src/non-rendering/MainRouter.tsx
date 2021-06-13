import React, { FC } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, useParams, generatePath } from 'react-router-dom'

import Root from 'pages/Root'
// import Dashboard from 'pages/Dashboard'
// import Students from 'pages/Events'
// import Professors from 'pages/Intramurals'

export const MainRouter: FC = () => {
  return(
    <Router>
      <Switch>
        {/* put in later: 
        <Route path="/users/sign_in" component={Signin} />
        <Route path="/users/password/new" component={ForgotPassword} />
        <Route path="/users/password/edit" component={ChangePassword} />
        <Route path="/users/sign_up" component={Signup} />
        <Route path="/complete-profile" component={CompleteProfile} />
        */}
        {/* <Route path="/dashboard" component={Dashboard} />
        <Route path="/events" component={Events} />
        <Route path="/intramurals" component={Intramurals} /> */}
        <Route path="/" component={Root} />
      </Switch>
    </Router>
  )
}

export default MainRouter
