import React from 'react'
import styles from './styles.module.scss'

function Button({ onClick, value }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {value}
    </button>
  )
}

export default Button
