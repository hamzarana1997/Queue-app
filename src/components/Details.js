import React, { useState, useEffect } from "react";
import firebase from "../config/Firebase";
import { useParams } from "react-router-dom";
import ModalToken from "./ModalToken";
import { useHistory } from "react-router-dom";
import SoldTokenModal from "./SoldTokenModal";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

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
    getSingleCompany();
    getUser();
  }, []);

  if (!company) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="main-detail">
      <div className="detail-div">
        <img
          src={company.certificate}
          style={{ width: "100%", borderRadius: "10px" }}
        />

        <h3>Name:{company.compName}</h3>
        <h3>Since:{company.since}</h3>

        <h3>Tokens: {company.Token}</h3>
        <p>
          <SoldTokenModal userList={tokenUser} />
        </p>
        <h3>Address: {company.address}</h3>

        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `250px` }} />}
          mapElement={<div style={{ height: `100%`, width: `400px` }} />}
        />

        <div>
          <ModalToken getU1={getUser} getCo1={getSingleCompany} />
        </div>
      </div>
    </div>
  );
}
export default Details;
