import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Login from "../components/Login";
import Home from "../components/Home";
import Company from "../components/Company";
import Modal from "../components/ModalBox";
import Details from "../components/Details";
import User from "../components/User";
import DetailForUser from "../components/DetailForUser";

export default function MainRouter({ isLoggedIn, uid }) {
  const currentPath =
    window.location.pathname.length === 1 ? "/home" : window.location.pathname;
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            {!isLoggedIn ? <Login /> : <Redirect to={currentPath} />}
          </Route>

          <Route path="/home">{AuthChecker(isLoggedIn, <Home />)}</Route>

          <Route path="/company">
            {AuthChecker(isLoggedIn, <Company cid={uid} />)}
          </Route>
          <Route path="/modal">{AuthChecker(isLoggedIn, <Modal />)}</Route>
          <Route path="/details/:slug">
            {AuthChecker(isLoggedIn, <Details />)}
          </Route>
          <Route path="/user">
            {AuthChecker(isLoggedIn, <User cid={uid} />)}
          </Route>
          <Route path="/detailforuser/:slug">
            {AuthChecker(isLoggedIn, <DetailForUser uid={uid}/>)}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const AuthChecker = (isLoggedIn, component) => {
  return isLoggedIn ? component : <Redirect to="/" />;
};
