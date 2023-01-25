import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
<<<<<<< HEAD

import reduxStore from 'store/ReduxStore'

import MainRouter from 'non-rendering/MainRouter'

=======

import reduxStore from './store/ReduxStore'

import MainRouter from './non-rendering/MainRouter'

>>>>>>> prisma
import './styles.module.scss'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <MainRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
