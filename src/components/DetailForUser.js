import React, { useState, useEffect } from "react";
import firebase from "../config/Firebase";
import { useParams } from "react-router-dom";
import ModalToken from "./ModalToken";
import { useHistory } from "react-router-dom";
import SoldTokenModal from "./SoldTokenModal";
import Swal from "sweetalert";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import BuyTokenModal from "./BuyTokenModal";
import Company from "./Company";
import {BarLoader,BeatLoader} from "react-spinners"
import { Alert } from "react-bootstrap";

function Details({uid}) {
  const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap defaultZoom={18} defaultCenter={{ lat: latt, lng: lngg }}>
        {props.isMarkerShown && <Marker position={{ lat: latt, lng: lngg }} />}
      </GoogleMap>
    ))
  );

  const history = useHistory();
  let { slug } = useParams();
  const [tokenUser, setTokenUser] = useState();
  const [company, setCompany] = useState();

  const [latt, setLatt] = useState();
  const [lngg, setLngg] = useState();
  const date = new Date(Date.now());
  const nowDate = date.getDate();
  const [tokens, setTokens] = useState();
  // const [currentTokens, setCurrentToken] = useState("");

  const allowDisallow = function () {
    firebase
      .firestore()
      .collection("companies")
      .doc(slug)
      .get()
      .then(function (doc) {
        setTokens(doc.data().Token);
     
      });
  };

  const increaseCurrentToken = function () {
    firebase
      .firestore()
      .collection("companies")
      .doc(slug)
      .get().then(function (doc) {
        const ct = doc.data().currentToken + 1;
        firebase
          .firestore()
          .collection("companies")
          .doc(slug)
          .update({
            currentToken: ct,
          })
          .then(function () {
          
           
          })
          .catch(function () {});
      });
  };
  const sweetAlert = function () {
    getUser()
    getSingleCompany ()
    console.log("Token No. " , company.currentTokenBought)
    Swal({
      title: "Token No. " + company.currentTokenBought,
      text: "Current Token No. " + company.currentToken,
      icon: "info",
    });
  };

  const resetToken = function () {
    firebase
      .firestore()
      .collection("companies")
      .doc(slug)
      .get()
      .then(function (doc) {
        if (doc.data().currentDate != nowDate) {
          firebase
            .firestore()
            .collection("companies")
            .doc(slug)
            .update({
              Token: 0,
              currentDate: nowDate,
              currentToken:0,
              currentTokenBought:0
            })
            .then(function () {
              // Swal({
              //   title: "Token Reset",
              //   text: "Tokens have been reset",
              //   icon: "info",
              // });
            });
        }
      });
  };

  const getSingleCompany = async function () {
    var docRef = await firebase.firestore().collection("companies").doc(slug);
    docRef
      .onSnapshot(function (doc) {
      
        setCompany(doc.data());
        // setCurrentToken(doc.data().currentToken)
        setLatt(doc.data().latitude);
        setLngg(doc.data().longitude);
      
      })
      // .catch(function (error) {
      //   alert(error);
      // });
  };
  const getUser = function () {
    firebase
      .firestore()
      .collection("customer")
      .where("userid", "==", slug)
      .get()
      .then((res) => {
        const list = [];
        res.forEach((doc) => {
          const customer = doc.data();
          list.push(customer);
        });
        setTokenUser(list);
      });
  };
 

//   function notifyMe() {

    
    
//     if (Notification.permission !== 'granted')
//      Notification.requestPermission();
//     else {
//         var notification = new Notification("");
//      notification.onclick = function() {
//       window.open('http://stackoverflow.com/a/13328397/1269037');
//      };
//     }
   
// }


const ttandToken = async()=>{
  let tt = 0
  let totalToken = 0;
  let cToken = 0
    await firebase.firestore().collection("companies").doc(slug).get().then(function(doc){
    tt = doc.data().tokenTime*1000
    totalToken = doc.data().Token
    

  })
  if(tt && totalToken){
    
       
    const interval = setInterval(()=> {
         
    if (Notification.permission !== 'granted')
    Notification.requestPermission();
   else {
    increaseCurrentToken()
    // firebase.firestore().collection("companies").doc(slug).get().then(function(doc){
    //   cToken = doc.data().currentToken
    // })
   firebase.firestore().collection("customer").where("fbId","==",uid).get().then(function(){
    var notification = new Notification(`Next Customer Come after ${tt/1000} Seconds`);
    notification.onclick = function() {
     window.open('http://stackoverflow.com/a/13328397/1269037');
     
    };
   })
   
      
   }
     },tt)

     setTimeout(()=> {
        clearInterval(interval)
       
     },tt*totalToken)
     setTimeout(()=>{
      firebase
      .firestore()
      .collection("companies")
      .doc(slug)
      .update({
        Token: 0,
        currentDate: nowDate,
        currentToken: 0,
        currentTokenBought: 0
      })
      Swal({
        title: "Limit Reached",
        text: "Tokens have been reset",
        icon: "info",
      });
     },(tt*totalToken)+3000)
  }
 
}

const reset = function () {
  firebase
  .firestore()
  .collection("companies")
  .doc(slug)
  .update({
    Token: 0,
    currentDate: nowDate,
    currentToken: 0,
    currentTokenBought: 0
  })
}

  useEffect(() => {
      console.log('Notification' , Notification)
    Notification.requestPermission()
    allowDisallow();
    resetToken();
    getSingleCompany();
    getUser();
    ttandToken()
    
  }, []);
  useEffect( () => {
   

    // if(tt && tokens){
       
    //   const interval = setInterval(()=> {
    //       alert('Notification')
    //    },tt)

    //    setTimeout(()=> {
    //       clearInterval(interval)
    //    },tt*tokens)
    // }


    // return () => clearInterval(interval); 
   
  }, []);
 

  if (!company) {
    return <BeatLoader loading/>;
  }
  
 
  return (
    <div className="detail-div">
      <img
        src={company.certificate}
        style={{ width: "100%", borderRadius: "10px" }}
      />
      <h3>Name:{company.compName}</h3>
      <h3>Since:{company.since}</h3>
      <h3>Tokens: {company.Token}</h3>
      <h3>Current Token: {company.currentToken}</h3>
      <h3>Address: {company.address}</h3>
      <MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `250px` }} />}
        mapElement={<div style={{ height: `100%`, width: `400px` }} />}
      />

      <button
        class="btn btn-secondary"
        style={{ marginRight: "10px", marginTop: "5px" }}
        onClick={increaseCurrentToken}
      >
        next Token
      </button>
      <button
        class="btn btn-secondary"
        style={{ marginTop: "5px" }}
        onClick={sweetAlert}
      >
        Your Token
      </button>

      <button class="btn btn-secondary" style={{ marginLeft: "10px", marginTop: "5px" }} onClick={reset}>rest tokens</button>

      <div>
        <p>
          {tokens > 0 ? (
            <BuyTokenModal getU={getUser} getCo={getSingleCompany} sl={slug} uid={uid}/>
          ) : (
            <button className="ModalButtonToken" variant="success" disabled>
              Buy Token
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
export default Details;
