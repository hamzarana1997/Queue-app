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
  const [currentToken, setCurrentToken] = useState();

  const allowDisallow = function () {
    firebase
      .firestore()
      .collection("companies")
      .doc(slug)
      .get()
      .then(function (doc) {
        setTokens(doc.data().Token);
        setCurrentToken(doc.data().currentToken);
      });
  };

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
              currentDate: 0,
            })
            .then(function () {
              Swal({
                title: "Token Reset",
                text: "Tokens have been reset",
                icon: "info",
              });
            });
        }
      });
  };

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
    allowDisallow();
    resetToken();
    getSingleCompany();
    getUser();
  }, []);

  useEffect(() => {}, []);

  if (!company) {
    return <h1>loading...</h1>;
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

      <div>
        <p>
          {tokens > 0 ? (
            <BuyTokenModal getU={getUser} getCo={getSingleCompany} sl={slug} />
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
