import React, { useState } from "react"

import { BrowserRouter as Router, Switch, Route, Link,Redirect } from "react-router-dom";
import Login from "../components/Login"
import Home from "../components/Home"
import Company from "../components/Company";
import Modal from "../components/ModalBox";
import Details from "../components/Details"
import User from "../components/User"


export default function MainRouter({ isLoggedIn, uid }) {

  // const [loggedIn,setLoggedIn] = useState(false)
  console.log("window.location.pathname***", window.location.pathname);

  const currentPath = window.location.pathname.length === 1 ? "/home" : window.location.pathname;
    return (
      
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
          <Route   path="/" exact>
          {isLoggedIn ? <Redirect to={currentPath} /> : <Login />}
          </Route>
             
             <Route path="/home">
             {/* <Home/>
             {isl===} */}
             {AuthChecker(isLoggedIn,<Home/>)}
             </Route>
            
            {/* <Redirect from="/" to="/home"/> */}
            <Route path="/company">
              {/* <Company /> */}
              {AuthChecker(isLoggedIn,<Company cid={uid}/>)}
            </Route> 
            <Route path="/modal">
              {/* <Modal /> */}
              {AuthChecker(isLoggedIn,<Modal/>)}
            </Route> 
            <Route path="/details/:slug">
              {/* <Details /> */}
              {AuthChecker(isLoggedIn,<Details/>)}
            </Route> 
            <Route path="/user">
              {/* <Modal /> */}
              {AuthChecker(isLoggedIn,<User cid={uid}/>)}
            </Route>
            
            
            {/* <Redirect from="/home" to="/"/> */}
          </Switch>
        </div>
      </Router>
    );
  }
  
  const AuthChecker = (isLoggedIn, component) => {
    return isLoggedIn ? component : <Redirect to="/" />;
  };