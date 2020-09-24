import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./components/Login"
import MainRouter from "./config/MainRouter"
import firebase from "./config/Firebase"


function App() {



  const [isLoggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    listenAuthentication();
  }, []);

  const listenAuthentication = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      // setLoading(false)
      setLoggedIn(user ? { email: user.email, uid: user.uid } : false);
    });
  };
  // return (
  //   <div className="App">
  //     <div className="btn-3">



  //     </div>

  //   </div>
  // );
  return (

    <div className="App">
      <header className="App-header">
        {isLoggedIn && <button onClick={() => firebase.auth().signOut()} className="btn btn-danger" style={{ margin: "20px" }}>Logout</button>}
        <MainRouter isLoggedIn={isLoggedIn} uid={isLoggedIn.uid} />
      </header>
    </div>
  );
}

export default App;
