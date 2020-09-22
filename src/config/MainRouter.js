import React, { useState } from "react"

import { BrowserRouter as Router, Switch, Route, Link,Redirect } from "react-router-dom";
import Login from "../components/Login"
import Home from "../components/Home"
import Company from "../components/Company";
import Modal from "../components/ModalBox";
import Details from "../components/Details"
export default function MainRouter() {

  const [loggedIn,setLoggedIn] = useState(false)
    return (
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
          <Route   path="/" exact>
          <Login/>
          </Route>
             
             <Route path="/home">
             <Home/>
             </Route>
            
            {/* <Redirect from="/" to="/home"/> */}
            <Route path="/company">
              <Company />
            </Route> 
            <Route path="/modal">
              <Modal />
            </Route> 
            <Route path="/details/:slug">
              <Details />
            </Route> 
            
            
            {/* <Redirect from="/home" to="/"/> */}
          </Switch>
        </div>
      </Router>
    );
  }
  