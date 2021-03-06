import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import MainRouter from "./config/MainRouter";
import firebase from "./config/Firebase";
import {BarLoader,BeatLoader} from "react-spinners"

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    listenAuthentication();
    setTimeout(()=>{
      setisloading(false)
    },2000)
     
  }, []);
  console.log("dpic", isLoggedIn.pic);
  const listenAuthentication = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      setLoggedIn(
        user
          ? {
              email: user.email,
              uid: user.uid,
              name: user.displayName,
              pic: user.photoURL,
            }
          : false
      );
    });
  };

  // if () {
  //   return <h1>loading...</h1>;
  // }

  return (
    <div className="App" id="main-div">
      {!isloading ? <header className="App-header">
        {isLoggedIn&&
        <div className="app-div">
          <div className="app-div1">
            {isLoggedIn && <h4>Welcome: {isLoggedIn.name}</h4>}
          </div>
          <div>
            {isLoggedIn && (
              <button
                onClick={() => firebase.auth().signOut()}
                className="btn btn-danger"
                style={{ margin: "20px" }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
        }
        <MainRouter isLoggedIn={isLoggedIn} uid={isLoggedIn.uid} />
      </header>
       : <BeatLoader loading/>}
    </div>
  );
}

export default App;
