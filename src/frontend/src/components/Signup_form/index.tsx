import React, { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Selector from '../Mult-Select/index'
import styles from './styles.module.scss'


const Signup_form: FC = () => {
    return (
        <div className={styles.container}>
            <form>
                <Selector heading={"Select Your League Level"} labels={["A","B","C"]} grouping={"league-lev"}/>
                <Selector heading={"Select Your Gender"} labels={["Male","Female"]} grouping={"gender"}/>
                <div className={styles.otherSelect}>
                    <input type="radio" className={styles.button} name="gender" value=""/>
                    <label>Other </label>
                    <input type="text" className={styles.textButton} name="gender"/>
                </div>
                <NavLink to={'/intramurals'} className={styles.submitWrapper}>
                    <button type="submit">Submit</button> 
                </NavLink> 
            </form>
        </div>
            
    )
}

export default Signup_form