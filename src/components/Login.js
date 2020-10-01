import React, { useEffect, useState } from "react";
import firebase from "../config/Firebase";
import { connect } from "react-redux";
import { Userloggedin } from "../Redux/Actions";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

var provider = new firebase.auth.FacebookAuthProvider();

function Login(props) {
  const history = useHistory();

  const fb = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        var token = result.credential.accessToken;

        history.push("/home");

        var user = result.user;
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        var email = error.email;

        var credential = error.credential;
      });
  };
  return (
    <div className="login-form">
      <div className="login-form-child">
        <button className="login-button" onClick={() => fb()}>
          Signin With Facebook
        </button>
      </div>
    </div>
  );
}
export default Login;
