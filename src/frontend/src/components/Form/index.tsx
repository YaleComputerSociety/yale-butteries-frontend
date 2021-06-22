import React, { FC } from 'react'
import classnames from 'classnames'
import CloseIcon from 'svgs/CloseIcon'

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
      <div className={styles.formContent}>
        <button onClick={setInvisible} className={styles.close}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Form
