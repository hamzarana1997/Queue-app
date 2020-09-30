import React, { useEffect, useState } from "react"
import logo from "../assests/add.png"
import Modal from "./ModalBox"
import firebase from "../config/Firebase"


import { useHistory } from "react-router-dom";
function Company({ cid }) {
    const uid = cid
    const [compList, setCompList] = useState()
    const history = useHistory();
    const [limit, setLimit] = useState(2)
    const [loading, setLoading] = useState(false)
    // console.log("user==>",cid)
    const detail = function () {

    }











    const addCompany = function () {
        setLoading(true)
        if (uid) {
            firebase.firestore().collection("companies").limit(limit).where("cid", "==", uid).get().then((res) => {
                const list = []
                res.forEach(doc => {
                    const comp = doc.data()
                    list.push({ ...comp, compId: doc.id })
                })
                setCompList(list)
                setLoading(false)

            })
        }
    }

    const isBottom = (el) => {
        if (el) {
            return el.getBoundingClientRect().bottom <= window.innerHeight;
        }

    }


    const trackScrolling = () => {
        const wrappedElement = document.getElementById('company');
        if (isBottom(wrappedElement) && !loading) {
            //   console.log('header bottom reached');
            setLimit(limit + 2)
            console.log(limit)
            document.removeEventListener('scroll', trackScrolling);
        }
    };

    useEffect(() => {
        addCompany()

        document.addEventListener('scroll', trackScrolling);
    }, [uid, limit])
    useEffect(() => {

        document.addEventListener('scroll', trackScrolling);
        return () => {
            document.removeEventListener('scroll', trackScrolling);
        }
    }, [])






    return (

        <div className="company-div1">
            <div className="main-company-div" id="company">
                <Modal companyId={cid} />

                <div>
                    <h1>Companies List</h1>
                    {compList && compList.map(items => {
                        return (
                            <div className="company-list" style={{ marginBottom: "30px" }}>
                                <h4>Name: {items.compName}</h4>
                                <div> <img src={items.certificate} style={{ width: "90px", height: "90px", marginBottom: "10px" }} /></div>
                                <div><button className="company-button" class="btn btn-success" style={{ borderWidth: "3px" }} onClick={() => history.push(`/details/${items.compId}`)}>Details</button></div>


                            </div>

                        )

                    })}
                </div>
            </div>
        </div>

    )
}
export default Company;