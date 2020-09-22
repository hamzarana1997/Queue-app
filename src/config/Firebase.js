import * as firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyBdxRkuZiL7fgBl2ZkqsKYvIWeEAYhQJkE",
    authDomain: "qa-app-b26de.firebaseapp.com",
    databaseURL: "https://qa-app-b26de.firebaseio.com",
    projectId: "qa-app-b26de",
    storageBucket: "qa-app-b26de.appspot.com",
    messagingSenderId: "608957982616",
    appId: "1:608957982616:web:b0e85fcbae95d707e56ded",
    measurementId: "G-JY7MWN0XSP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  
  const addCompany = function(compName,address,since,image){
    const storageRef = firebase.storage().ref(`company/${Date.now()}.jpg`); 
    storageRef.put(image).then(function (response) {
      response.ref.getDownloadURL().then(function (url) {

    firebase.firestore().collection("companies").add({
      compName,address,since,url
    }).then(function(){
      alert("added !!")
    }).catch(function(e){
      alert(e.message)
    })
  });
});
  
  }
  
  export default firebase;
  export{addCompany}