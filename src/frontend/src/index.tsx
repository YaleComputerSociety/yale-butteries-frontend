import React from 'react'
import ReactDOM from 'react-dom'

import MainRouter from 'non-rendering/MainRouter'

import styles from './styles.module.scss'

ReactDOM.render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>,
  document.getElementById('root')
)
