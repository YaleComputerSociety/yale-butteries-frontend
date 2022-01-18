import React, { FC } from 'react'

import styles from './styles.module.scss'

interface MultSelect {
  heading: string
  labels: Array<string>
  grouping: string
}

const Selector: FC<MultSelect> = ({ heading, labels, grouping }: MultSelect) => {
  return (
    <fieldset className={styles.fieldset}>
      <h1 className={styles.header}>{heading}</h1>
      <div style={{ marginTop: '10px' }}>
        {labels.map((label) => (
          <div className={styles.inputControl} key={label}>
            <input type="radio" className={styles.button} id={label} name={grouping} value={label} />
            <label htmlFor={label}>{label}</label>
          </div>
        ))}
      </div>
    </fieldset>
  )
}

export default Selector
