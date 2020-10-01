import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import React, { useState } from "react";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={18}
      defaultCenter={{ lat: 24.903029, lng: 67.1135917 }}
    >
      {props.isMarkerShown && (
        <Marker
          position={{ lat: 24.903029, lng: 67.1135917 }}
          draggable={true}
          onDragEnd={(e) => {
            var lat = e.latLng.lat();
            var lng = e.latLng.lng();
            fetch(
              `https://api.foursquare.com/v2/venues/search?client_id=CJBNSYMGSWZFKNHZQY1OS4E23KH0P4RI33EPTOKAWNALGQJN&client_secret=FLYVUKUW4BK5ODZEGJ50J1WR3JFEQCZPDMPMTOY3HMAP3CAC&ll=${lat},${lng}&v=20180323`
            )
              .then((res) => res.json())
              .then((res) => props.getmap(res, lat, lng));
          }}
        />
      )}
    </GoogleMap>
  ))
);

export default MyMapComponent;
