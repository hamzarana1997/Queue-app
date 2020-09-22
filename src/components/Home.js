import React from "react"
import firebase from "../config/Firebase";
import { useHistory } from "react-router-dom";
import MyMapComponent from "./Map"

function Home(){
    const history = useHistory();
    const logOff = function(){
        firebase.auth().signOut().then(function() {
            history.replace("/")
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    }

    const company = function (){
        history.push("/company")
    }
    return(
        <div>
<button onClick={()=> company()}>Are you a company?</button>
<button>Are you finding/waiting for tokens?</button>
<br/>
<br/>
<button onClick={() => logOff()}>Log off</button>

<MyMapComponent
  isMarkerShown
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
        </div>

        
    )
}

export default Home;