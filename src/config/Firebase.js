import * as firebase from 'firebase';
import React, { Component } from 'react';
import SweetAlert from 'sweetalert-react';


var firebaseConfig = {
  apiKey: "AIzaSyD3CRaRiRenBKwbZhI7qBY1dVffwmsBEwk",
  authDomain: "q-app-61a6a.firebaseapp.com",
  databaseURL: "https://q-app-61a6a.firebaseio.com",
  projectId: "q-app-61a6a",
  storageBucket: "q-app-61a6a.appspot.com",
  messagingSenderId: "1024872741903",
  appId: "1:1024872741903:web:422211163ca80a7733b77a",
  measurementId: "G-RV9XGY5XQT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const addCustomer = function(name,email,image,userid){
  if(name=="" || email =="" || image == ""){
    alert("You must fill all the fields")
  }
  else{
  const storageRef = firebase.storage().ref(`images/${Date.now()}`); 
    storageRef.put(image).then(function (response) {
      response.ref.getDownloadURL().then(function (url) {

    firebase.firestore().collection("customer").add({
      name,email,image:url,userid
    }).then(function(){
     alert("Token Bought")
     firebase.firestore().collection("companies").doc(userid).get().then((res) => {
      
      let tk = res.data().Token
      let tk1 = +tk - 1
      console.log(tk1)
      firebase.firestore().collection("companies").doc(userid).update({
        Token:tk1
      }).then(function(){
       
      }).catch(function(e){
        alert(e.message)
      })
  })
    
    }).catch(function(e){
      alert(e.message)
    })
  });
});
}
}

const addToken = function(token,slug){
  if(token==""){
    alert("You must fill all the fields")
  }
  else{
  firebase.firestore().collection("companies").doc(slug).update({
    Token:token
  }).then(function(){
   alert("token added")
  }).catch(function(e){
    alert(e.message)
  })
}
}
  const addCompany = function(compName,address,since,image,cid){

    if(compName=="" || address =="" || since=="" || image == ""){
      alert("You must fill all the fields")
    }
    else{
    const storageRef = firebase.storage().ref(`images/${Date.now()}`); 
    storageRef.put(image).then(function (response) {
      response.ref.getDownloadURL().then(function (url) {

    firebase.firestore().collection("companies").add({
      compName,address,since,certificate:url,cid
    }).then(function(){
     alert("added")
    }).catch(function(e){
      alert(e.message)
    })
  });
});
}
  }
  
  export default firebase;
  export{addCompany, addToken , addCustomer}