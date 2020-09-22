import React, { useEffect, useState } from "react"
import firebase from "../config/Firebase";
import { connect } from 'react-redux';
import { Userloggedin } from '../Redux/Actions';
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom"

var provider = new firebase.auth.FacebookAuthProvider();


function Login(props) {

    const history = useHistory();
    // useEffect(() => {
    //     console.log("WORing", props)
    //      props.onLoggedin()
    //     console.log("WORing 22", props.Reduxstate.userloggedin)

    // }, [])



    const fb = () => {
        // props.onLoggedin()

        // props.Userloggedin()
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;

            history.push("/home")

            // The signed-in user info.

            var user = result.user;
            console.log(user)
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(error.message)
            // ...
        });
    }
    return (
        <div>
            <button onClick={() => fb()}>Login</button>

            {/* <p>{props.userloggedin ? 'true' : 'false'}</p> */}
        </div>
    )
}
export default Login;

// function mapStateToProps(state) {
//     return {
//         Reduxstate: state
//     }
// }

// const mapDispatchToProps = function (dispatch) {
//     return {
//         onLoggedin: () => dispatch(Userloggedin())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login);