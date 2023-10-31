import React from 'react'
import Styles from './Textarea.module.css'
export default function Textarea(props) {
  return (
    <div className={Styles.container} value={props.text}>
        <label className={Styles.label}>{props.label}</label>
        <textarea className={Styles.text} rows="10" cols="20"  {...props} />
            
        <br/>
    </div>
  )
}

