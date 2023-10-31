import React from "react";
import Form from "../InputControl/Form";
import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Styles from "./SignUp.module.css";
function SignUp() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullname:"",
    mailID: "",
    pass: "",
  });
  const [err, setErr] = useState("");
  const [submithandle, setsubmithandle] = useState(false);
  function handleClick() {
    if (!values.mailID || !values.pass) {
      setErr("Fill the fields");
      return;
    }
    setsubmithandle(true);
    setErr("");
    createUserWithEmailAndPassword(auth, values.mailID, values.pass)
      .then((res) => {
        setsubmithandle(false);
        navigate("/Home");
      })
      .catch((err) => {
        setErr(err.message);
        setsubmithandle(false);
      });
  }

  return (
    <>
      <div className={Styles.body}>
        <div className={Styles.container}>
          <h2 className={Styles.line}>SignUp</h2>
          <div className={Styles.form}>
          <Form
              label=" Full name :"
              placeholder="Full name"
              onChange={(event) => {
                setValues((prev) => ({ ...prev, fullname: event.target.value }));
              }}
            />
            <Form
              label="Email :"
              placeholder="UserId or email"
              onChange={(event) => {
                setValues((prev) => ({ ...prev, mailID: event.target.value }));
              }}
            />
            <Form
              label="password :"
              placeholder="Password"
              type="password"
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
                Signup
              </button>
            </div>
          </div>
        </div>
        <div className={Styles.foot}>
          <p>Already have an account? </p>
          <Link to="/">Signin</Link>
        </div>
      </div>
    </>
  );
}

export default SignUp;
