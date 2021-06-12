import React from 'react'
import ReactDOM from 'react-dom'

import styles from './styles.module.scss'

ReactDOM.render(
  <React.StrictMode>
    <div className={styles.testing}>Hello world, React success!</div>
  </React.StrictMode>,
  document.getElementById('root')
)