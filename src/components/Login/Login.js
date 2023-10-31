import React from "react";
//import app from ".../App"
import Form from "../InputControl/Form";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Styles from "./Login.module.css";
function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [submithandle, setsubmithandle] = useState(false);
  const [err, setErr] = useState("");
  function handleClick() {
    if(!values.email||!values.pass){
        setErr("fill all the fields");
       return;
    }
    setsubmithandle(true);
    setErr("");
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setsubmithandle(true);
        navigate("/Home");
      })
      .catch((err) => {
        setsubmithandle(false);
        setErr(err.message);
        setsubmithandle(false);
      });
  }

  return (
    <>
      <div className={Styles.body}>
        <div class={Styles.container}>
          <h2 class={Styles.line}>Login</h2>
          <div className={Styles.form}>
            <Form
              label="Email :"
              placeholder="Username of email"
              onChange={(event) => {
                setValues((prev) => ({ ...prev, email: event.target.value }));
              }}
            />
            <Form
              label="password :"
              placeholder="Password"
              onChange={(event) => {
                setValues((prev) => ({ ...prev, pass: event.target.value }));
              }}
            />
            <b>{err}</b>
            <div className={Styles.button}>
              <button
                className={Styles.btn}
                onClick={handleClick}
                disabled={submithandle}
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <div className={Styles.foot}>
          <p>Create new account? </p>
          <Link to="/SignUp">Signup</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
