import React, { useState, useEffect } from "react"
import firebase from "../config/Firebase"
import { useParams } from "react-router-dom"


function Details() {
    let {slug} = useParams()
    const [company, setCompany] = useState();
    const getSingleCompany = function () {
        var docRef = firebase.firestore().collection("companies").doc(slug);
        docRef.get().then(function (doc) {
            setCompany(doc.data())
        }).catch(function (error) {
            alert(error)
        })
    }
    return (
        <div>
            <h1>{company.compName}</h1>
        </div>
    )
}
export default Details;