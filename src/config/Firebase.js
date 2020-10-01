import * as firebase from "firebase";
import React, { Component } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import Swal from "sweetalert";
import Company from "../components/Company";

var firebaseConfig = {
  apiKey: "AIzaSyD3CRaRiRenBKwbZhI7qBY1dVffwmsBEwk",
  authDomain: "q-app-61a6a.firebaseapp.com",
  databaseURL: "https://q-app-61a6a.firebaseio.com",
  projectId: "q-app-61a6a",
  storageBucket: "q-app-61a6a.appspot.com",
  messagingSenderId: "1024872741903",
  appId: "1:1024872741903:web:422211163ca80a7733b77a",
  measurementId: "G-RV9XGY5XQT",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const addCustomer = function (
  name,
  email,
  image,
  userid,
  props,
  handleClose,
  tokenNo
) {
  if (name == "" || email == "" || image == "") {
    Swal({
      title: "Error",
      text: "You must fill all the fields",
      icon: "error",
    });
  } else {
    const storageRef = firebase.storage().ref(`images/${Date.now()}`);
    storageRef.put(image).then(function (response) {
      response.ref.getDownloadURL().then(function (url) {
        firebase
          .firestore()
          .collection("customer")
          .add({
            name,
            email,
            image: url,
            userid,
            TokenNumber: tokenNo + 1,
          })
          .then(function () {
            firebase
              .firestore()
              .collection("companies")
              .doc(userid)
              .get()
              .then((res) => {
                let tk = res.data().Token;

                let tk1 = +tk - 1;

                handleClose();
                firebase
                  .firestore()
                  .collection("companies")
                  .doc(userid)
                  .update({
                    currentTokenBought: tokenNo + 1,
                    Token: tk1,
                  })
                  .then(function () {
                    props.getU();
                    props.getCo();

                    Swal({
                      title: "Token Bought",
                      text:
                        "you've successfully bought the token of this company",
                      icon: "success",
                    });
                  })
                  .catch(function (e) {
                    alert(e.message);
                  });
              });
          })
          .catch(function (e) {
            alert(e.message);
          });
      });
    });
  }
};

const addToken = function (token, slug, handleClose, props, currentDate) {
  if (token == "") {
    Swal({
      title: "Error",
      text: "You must fill all the fields",
      icon: "error",
    });
  } else {
    firebase
      .firestore()
      .collection("companies")
      .doc(slug)
      .update({
        Token: +token,
        currentDate,
      })
      .then(function () {
        props.getU1();
        props.getCo1();
        handleClose();

        Swal({
          title: "Company Token",
          text: "Token added successfully",
          icon: "success",
        });
      })
      .catch(function (e) {
        alert(e.message);
      });
  }
};
const addCompany = function (
  compName,
  address,
  since,
  image,
  cid,
  latt,
  lngg,
  handleClose,
  currentToken,
  currentTokenBought,
  token1
) {
  if (compName == "" || address == "" || since == "" || image == "") {
    Swal({
      title: "Company",
      text: "You must fill all the fields",
      icon: "error",
    });
  } else {
    const storageRef = firebase.storage().ref(`images/${Date.now()}`);
    storageRef.put(image).then(function (response) {
      response.ref.getDownloadURL().then(function (url) {
        firebase
          .firestore()
          .collection("companies")
          .add({
            compName,
            address,
            since,
            certificate: url,
            cid,
            latitude: latt,
            longitude: lngg,
            currentTokenBought,
            currentToken,
            Token: token1,
          })
          .then(function () {
            handleClose();

            Swal({
              title: "Company",
              text: "Your company added successfully",
              icon: "success",
            });
          })
          .catch(function (e) {
            Swal({
              title: "Error",
              text: e.message,
              icon: "error",
            });
            alert();
          });
      });
    });
  }
};

export default firebase;
export { addCompany, addToken, addCustomer };
