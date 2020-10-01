import React, { useEffect, useState } from "react";
import logo from "../assests/add.png";

import firebase from "../config/Firebase";
import { useHistory } from "react-router-dom";
import BuyTokenModal from "./BuyTokenModal";

function User({ cid }) {
  const uid = cid;
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [compList, setCompList] = useState();
  const history = useHistory();

  const addCompany = function () {
    firebase
      .firestore()
      .collection("companies")
      .where("compName", "==", name)
      .get()
      .then((res) => {
        const list = [];
        res.forEach((doc) => {
          const comp = doc.data();
          list.push({ ...comp, compId: doc.id });
          setId(doc.id);
        });
        setCompList(list);
        setName("");
      });
  };
  const addCompany1 = function () {
    firebase
      .firestore()
      .collection("companies")
      .get()
      .then((res) => {
        const list = [];
        res.forEach((doc) => {
          const comp = doc.data();
          list.push({ ...comp, compId: doc.id });
          setId(doc.id);
        });
        setCompList(list);
      });
  };

  useEffect(() => {
    addCompany1();
  }, []);

  return (
    <body className="user-body">
      <div className="user-main-div" id="headerss">
        <div>
          <div>
            <div className="user-div">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="search company here"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <div class="input-group-append">
                  <button
                    onClick={addCompany}
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    Search
                  </button>
                </div>
                <button onClick={addCompany1} class="btn btn-primary">
                  Show All
                </button>
              </div>
            </div>
          </div>

          <div className="main-company-div">
            <div>
              <h1>Companies List</h1>
              {compList &&
                compList.map((items) => {
                  return (
                    <div
                      className="company-list"
                      style={{ marginBottom: "30px" }}
                    >
                      <h4>Name: {items.compName}</h4>
                      <div>
                        {" "}
                        <img
                          src={items.certificate}
                          style={{
                            width: "90px",
                            height: "90px",
                            marginBottom: "10px",
                          }}
                        />
                      </div>
                      <div>
                        <button
                          style={{ marginBottom: "10px", borderWidth: "3px" }}
                          class="btn btn-success"
                          onClick={() =>
                            history.push(`/detailforuser/${items.compId}`)
                          }
                        >
                          Details & Buy Token
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default User;
