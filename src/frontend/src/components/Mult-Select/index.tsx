import React, { FC, useState } from 'react'

import styles from './styles.module.scss'

interface MultSelect {
  heading: string
  labels: Array<string>
  grouping: string
  
}

const Selector: FC<MultSelect> = ({heading, labels, grouping}) => {
  return (
    <fieldset className={styles.fieldset}>
      <h1>{heading}</h1>
      {
        labels.map(label =>
        <div className={styles.inputControl}>
          <input type="radio" className={styles.button} id={label} name={grouping} value={label}/>
          <label htmlFor={label}>{label}</label>
        </div>)
      }
    </fieldset>    
  )
}

export default Selector