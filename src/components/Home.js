import React from "react";
import firebase from "../config/Firebase";
import { useHistory } from "react-router-dom";
import MyMapComponent from "./Map";

function Home() {
  const history = useHistory();

  const company = function () {
    history.push("/company");
  };
  return (
    <div className="home">
      <button
        onClick={() => company()}
        class="btn btn-primary"
        style={{ marginRight: "10px" }}
      >
        Are you a company?
      </button>
      <button
        onClick={() => {
          history.push("/user");
        }}
        class="btn btn-primary"
      >
        Are you finding/waiting for tokens?
      </button>
    </div>
  );
}

export default Home;
