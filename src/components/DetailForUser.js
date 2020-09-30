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

function Details() {
  const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap defaultZoom={18} defaultCenter={{ lat: latt, lng: lngg }}>
        {props.isMarkerShown && (
          <Marker
            position={{ lat: latt, lng: lngg }}
            //   var lat =
            //   var lng =
          />
        )}
      </GoogleMap>
    ))
  );

  const history = useHistory();
  let { slug } = useParams();
  const [tokenUser, setTokenUser] = useState();
  const [company, setCompany] = useState();

  const [latt, setLatt] = useState();
  const [lngg, setLngg] = useState();

  //   const interval =()=>{ setInterval(() => {
  //     console.log('This will run every second!');
  //   }, 5000);}
  // const date = new Date(Date.now())
  // console.log(date.getDate())

  // const resetToken = function(){
  //     firebase.firestore().collection("companies").get()
  // }

  const increaseCurrentToken = function () {
    firebase
      .firestore()
      .collection("companies")
      .doc(slug)
      .get()
      .then(function (doc) {
        const ct = doc.data().currentToken + 1;
        firebase
          .firestore()
          .collection("companies")
          .doc(slug)
          .update({
            currentToken: ct,
          })
          .then(function () {
            getSingleCompany();
          })
          .catch(function () {});
      });
  };
  const sweetAlert = function () {
    Swal({
      title: "Token No. " + company.currentTokenBought,
      text: "Current Token No. " + company.currentToken,
      icon: "info",
    });
  };

  // this.myInterval = setInterval(()=>{

  // },5000)

  // clearInterval(this.myInterval)

  const getSingleCompany = function () {
    var docRef = firebase.firestore().collection("companies").doc(slug);
    docRef
      .get()
      .then(function (doc) {
        setCompany(doc.data());
        setLatt(doc.data().latitude);
        setLngg(doc.data().longitude);
      })
      .catch(function (error) {
        alert(error);
      });
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

  useEffect(() => {
    // Notification.requestPermission()
    const interval = setInterval(() => {
      increaseCurrentToken();
      //     if (Notification.permission === "granted") {
      //         // If it's okay let's create a notification
      //         var notification = new Notification("Hi there!");
      //       }
      console.log("This will run every 5 second!");
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getSingleCompany();
    getUser();
  }, []);
  // console.log(tokenUser)
  // console.log(company)
  if (!company) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="detail-div">
      <button
        onClick={() => {
          history.goBack("/user");
        }}
      >
        go back
      </button>
      <h3>Name:{company.compName}</h3>
      <h3>Since:{company.since}</h3>
      <h3>Address: {company.address}</h3>

      <MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `250px` }} />}
        mapElement={<div style={{ height: `100%`, width: `400px` }} />}
      />

      <h3>Tokens: {company.Token}</h3>
      {/* <p><SoldTokenModal userList={tokenUser} /></p> */}
      <h3>Current Token: {company.currentToken}</h3>

      <h3>Certificates</h3>

      <img src={company.certificate} />
      <button onClick={increaseCurrentToken}>next Token</button>
      <button onClick={sweetAlert}>Your Token</button>

      <div>
        <p>
          {<BuyTokenModal getU={getUser} getCo={getSingleCompany} sl={slug} />}
        </p>
      </div>
      {/* <div>
               <ModalToken/>
           </div> */}
    </div>
  );
}
export default Details;
