import React, { useEffect, useState } from "react"
import logo from "../assests/add.png"
import Modal from "./ModalBox"
import firebase from "../config/Firebase"


import { useHistory } from "react-router-dom";
function Company() {
    const [compList, setCompList] = useState()
    const history = useHistory();
    const detail = function () {

    }
    const addCompany = function () {
        firebase.firestore().collection("companies").get().then((res) => {
            const list = []
            res.forEach(doc => {
                const comp = doc.data()
                list.push({ ...comp, compId: doc.id })
            })
            setCompList(list)
        })
    }
    useEffect(() => {
        addCompany()
    }, [])

    return (
        <div className="main-company-div">
            <Modal />
            
            <div>
                <h1>Companies List</h1>
                {compList && compList.map(items => {
                    return (
                        <div className="company-list">
                            <h4>Name: {items.compName}</h4>
                            <div> <img src={items.certificate} style={{ width: "90px", height: "90px", marginBottom: "10px" }} /></div>
                            <div><button class="btn btn-primary" onClick={() => history.push(`/details/${items.compId}`)}>Details</button></div>


                        </div>

                    )
                
            })}
            </div>
        </div>
    )
}
export default Company;