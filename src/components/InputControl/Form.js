import React from 'react'
import Styles from './Form.module.css';
function Form(props) {
  return (
    <>
    <div className={Styles.form}>
      <div className={Styles.label}>
    {props.label && <label>{props.label}</label>}
    </div>
    <input className={Styles.input} type="text" {...props} />
    <br/>
  </div>
    </>
  )
}

export default Form