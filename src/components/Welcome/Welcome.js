import React from 'react';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import {Link} from "react-router-dom";
import Styles from './Welcome.module.css';

export default function Welcome() {
  return (
    <>
    {/* <div className={Styles.photo} style={{height:"600px"}}><img src="diary.jpg" alt="Bground"/></div> */}
    <div className={Styles.container}>
    <div className={Styles.line}>
      <h1>Keep a diary, and someday it'll keep you.</h1>
    </div>
    <div className={Styles.link}>
    <Login/>
    </div>
    </div>
    </>
  )
}
