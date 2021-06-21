import React, { FC } from 'react'
import classnames from 'classnames'

import styles from './styles.module.scss'

interface FormProps {
  isVisible: boolean
  setIsVisible: (visibility: boolean) => void
}

const Form: FC<FormProps> = ({ isVisible, setIsVisible, children }) => {
  function setInvisible() {
    setIsVisible(false)
  }
  return (
    <div className={classnames(styles.form, { [styles.visible]: isVisible })}>
      <span className={styles.close} onClick={setInvisible} role={'button'} tabIndex={0}>
        {'&times;'}
      </span>
      {children}
    </div>
  )
}

export default Form