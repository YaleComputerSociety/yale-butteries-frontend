import React, { FC, useState } from 'react'
import Selector from '../Mult-Select/index'
import styles from './styles.module.scss'


const Signup_form: FC = () => {
    return (
            <form>
                <Selector heading={"Select Your League Level"} labels={["A","B","C"]} grouping={"league-lev"}/>
                <Selector heading={"Select Your Gender"} labels={["Male","Female"]} grouping={"gender"}/>
                <input type="radio" className={styles.button} name="gender" value=""/>Other <input type="text" className={styles.textButton} name="gender"/> 
                <button type="submit">Submit</button> 
            </form>
    )
}

export default Signup_form