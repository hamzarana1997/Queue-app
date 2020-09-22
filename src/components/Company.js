import React, { useEffect ,useState} from "react"
import logo from "../assests/add.png"
import Modal from "./ModalBox"
import firebase from "firebase"


import { useHistory } from "react-router-dom";
function Company (){
    const [compList,setCompList] = useState()
    const history = useHistory();
    const detail = function(){
        
    }
const addCompany = function (){
    firebase.firestore().collection("companies").get().then((res) =>{
        const list = []
        res.forEach(doc =>{
            const comp = doc.data()
            list.push({...comp,compId:doc.id})
        })
setCompList(list)
    })
}
useEffect(()=>{
    addCompany()
})
    return(
        <div className="main-company-div">
            <Modal/>
            {/* <button style={{backgroundColor:"transparent",borderColor:"transparent"}} onClick={()=>history.push("/modal")}><img src={logo} width="50"/></button> */}

              
            {compList&& compList.map(items=>{
                return(
                    <div className="company-list">
                        <h1>{items.compName}</h1>
                        <img src={items.url}/>
                        <button onClick={()=>history.push(`/details/${items.compId}`)}>Details</button>
                    </div>
                   
                )
            })}
        </div> 
    )
}
export default Company;