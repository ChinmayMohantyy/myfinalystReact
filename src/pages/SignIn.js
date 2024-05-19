import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../redux/actionTypes";
import "./authStyles.css";
import accountant from "../assets/g10.svg";
import Logo from "../assets/Logo-my.svg";
import ForgotPwd from "./ForgotPwd";
import { Submit } from "../Components/Button";
import { auth } from "../redux/actions/actions";

const initialErrors = { email: false, password: false };
const SignIn = (props) => {
  const dispatch = useDispatch();

  const [error, seterror] = useState(initialErrors);
  const [valid, setValid] = useState(false);
  const [forgotPswd, setForgotPswd] = useState(false);
  const [Value, setValue] = useState({ email: "", password: "" });
  const [Show, setShow] = useState(false);
  const [ShowPwd, setShowPwd] = useState(false);

  function modalshow() {
    if (error.email && Value.email.length > 0) {
      swal({
        // title: "chcek your email",
        text: "clicking on okay will send an OTP to your email",
        // icon: "warning",
        buttons: true,
        dangerMode: false,
      }).then((willDelete) => {
        if (willDelete) {
          const fd = new FormData();
          fd.append("email", Value.email);
          axios
            .post("api/v1/auth/check-email", fd)
            .then((res) => {
              setShow(!Show);
              swal(`OTP sent to your ${Value.email}`, {
                icon: "success",
              });
              // console.log(res,'api call')
            })
            .catch((err) => {
              // console.log(err.response)
              // swal(err.response.data.error)
              swal("", err.response.data.error, "error");
            });
        } else {
          swal("OTP not sent");
        }
      });

      return;
    }
    swal(`please enter a valid email`, {
      icon: "error",
    });
    // setForgotPswd(!forgotPswd)
    // setForgotPswd(false)
    console.log("modal open");
  }

  function validation() {
    let temp = { ...error };
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    temp.email =
      pattern.test(Value.email) | (Value.email.length == 0) ? true : false;
    temp.password = Value.password.length > 6 ? true : false;
    if (temp.email & temp.password) {
      setValid(true);
    } else {
      setValid(false);
    }
    seterror(temp);
    console.log(temp, "validation");
  }

  function handleChange(e) {
    setValue({ ...Value, [e.target.name]: e.target.value });
    console.log(Value, error, "values and errors");
  }

  useEffect(() => {
    validation();
    console.log(valid);
  }, [Value]);

  console.log(Show, "modal true");

  const responseGoogle = (res) => {
    console.log(res, "success response from google");
    console.log(res.profileObj.imageUrl, "image response from google");
    console.log(res.profileObj.email, "email response from google");
    console.log(res.profileObj.name, "success response from google");
    console.log(res.accessToken, "accessToken success response from google");
    dispatch({
      type: actionTypes.SET_PROFILE_IMAGE,
      payload: res.profileObj.imageUrl,
    });
    dispatch({
      type: actionTypes.SET_PROFILE_EMAIL,
      payload: res.profileObj.email,
    });
    dispatch({
      type: actionTypes.SET_PROFILE_NAME,
      payload: res.profileObj.name,
    });
    const fd = new FormData();
    fd.append("email", res.profileObj.email);
    fd.append("google_auth_token", res.googleId);
    axios
      .post("/api/v1/auth/gauth-login", fd)
      .then((res) => {
        console.log(res, "api call");
        localStorage.setItem("auth_token", res.data.token);
        props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err.response);
        // swal(err.response.data.error)
        swal("", err.response.data.error, "error");
      });
  };

  const responseError = (res) => {
    // console.log(res,'error response from google')
    swal("", res.error, "warning");
  };

  function handleSignUp() {
    if ((Value.email.length === 0) | (Value.password.length === 0)) {
      swal("", "fill all the required fields!", "warning");
    } else {
      console.log(Value);

      let fd = {
        email: Value.email,
        password: Value.password,
      };
      console.log(fd);
      // auth(fd)

      axios
        .post("/api/v1/auth/login", fd)
        .then((res) => {
          localStorage.setItem("auth_token", res.data.token);
          props.history.push("/dashboard");
          console.log(res, "api call");
          console.log(fd, "form data call");
        })
        .catch((err) => {
          // swal(err);
          swal("", "User does not exist", "error");
          console.log(err,"ccccccccccccc");
        });
    }
  }

  return (
    <div className="conatiner">
      <ForgotPwd Show={Show} setShow={setShow} />
      <div className="column-1">
        <div className="logo" style={{ display: "flex" }}>
          <img src={Logo}></img>
        </div>
        <div className="pg-title" style={{ display: "flex" }}>
          <h1>Sign In</h1>
        </div>
        <div
          className="emailId"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h3>Enter Email ID*</h3>
          <form>
            <input
              onChange={handleChange}
              type="text"
              id={error.email ? "fname" : "error"}
              name="email"
              value={Value.email}
              placeholder=""
            />
          </form>
          {error.email ? null : (
            <p style={{ color: "red", margin: "0 auto 0 0" }}>
              please enter a valid email id
            </p>
          )}
          {/* { !forgotPswd && error.email ? <p style={{color:'green',margin:'0 auto 0 0'}}>please enter a valid email id</p> : <p style={{color:'red',margin:'0 auto 0 0'}}>please enter a valid email id</p>} */}
        </div>
        <div
          className="password-signin"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h3>Enter Password</h3>
          <input
            id="fname"
            onChange={handleChange}
            value={Value.password}
            name="password"
            placeholder=""
            type={!ShowPwd ? "password" : "text"}
          />
          <i
            onClick={() => setShowPwd(!ShowPwd)}
            className={ShowPwd ? "fas fa-eye" : "far fa-eye-slash"}
          />
        </div>
        <div className="forgotPassword" style={{ display: "flex" }}>
          <p onClick={modalshow} style={{ cursor: "pointer" }}>
            Forgot Password?
          </p>
        </div>
        <div className="submit" onClick={handleSignUp}>
          {valid ? (
            <Submit value="Sign in" />
          ) : (
            <Submit disable value="Sign in" />
          )}
        </div>
        <div className="split">
          <p>
            <span>or</span>
          </p>
        </div>
        <GoogleLogin
          className="google-button"
          buttonText="Sign In with Google"
          clientId="661989732207-a17ni01sjrqicni6g59bqcv3uhjnannt.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          // isSignedIn={true}
          cookiePolicy={"single_host_origin"}
        />
        <div
          className="sign-up"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/signup">
            Don't have an account?<span> Sign Up</span>
          </Link>
        </div>
        <div
          className="terms"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>By joining, you agree to the </p>
          <a href="/"> Terms</a>
          <p> and</p>
          <a href="/"> Privacy policy</a>
        </div>
      </div>
      <div className="column-2">
        <img src={accountant} alt="accountant working"></img>
      </div>
    </div>
  );
};

export default SignIn;
