import React, { useState, useEffect } from "react"
import firebase from "../config/Firebase"
import { useParams } from "react-router-dom"
import ModalToken from "./ModalToken"
import { useHistory } from "react-router-dom";
import SoldTokenModal from "./SoldTokenModal"



function Details() {
   
   
    const history = useHistory();
    let {slug} = useParams()
    const [tokenUser,setTokenUser] = useState()
    const [company, setCompany] = useState();
    const getSingleCompany = function () {
        var docRef = firebase.firestore().collection("companies").doc(slug);
        docRef.get().then(function (doc) {
            setCompany(doc.data())
        }).catch(function (error) {
            alert(error)
        })
    }
    const getUser = function (){
        firebase.firestore().collection("customer").where("userid","==",slug).get().then((res) => {
            
            res.forEach(doc => {
              setTokenUser(doc.data())  
            })
            
        })
    }
    useEffect(()=>{
        getSingleCompany ()
        getUser()
    },[])
    // console.log(tokenUser)
    // console.log(company)
    if(!company){
        return <h1>loading...</h1>
    }
    return (
        <div>
 
           <h3>Name:{company.compName}</h3>
    <h3>Since:{company.since}</h3>
    <h3>Address: {company.address}</h3>
    <h3>Tokens: {company.Token}</h3>
    {/* <p><SoldTokenModal /></p> */}
    
           <h3>Certificates</h3>

           <img src={company.certificate}/>
           <div>
               <ModalToken/>
           </div>
        </div>
    )
}
export default Details;