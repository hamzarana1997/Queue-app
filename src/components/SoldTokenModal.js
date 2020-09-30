import React, { useEffect, useState, Component } from "react"


import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

// import { addCompany } from "../config/Firebase"
function Example({ userList }) {


    // setUl(props.userList)
    // console.log(props.userList)
    // console.log(ul)
    // let userTokenList = props.userList
    // console.log(userTokenList)
    // let {slug} = useParams()
    //   const userid = props.uid
    //   const [token,setToken] = useState("")
    //   const onAdd = function () {
    //     addToken(token,slug)
    //   }
    // const onAdd = function(){
    //     addCustomer(name,email,image,userid)
    // }

    const [show, setShow] = useState(false);
    //   const [compName, setCompName] = useState("")
    //   const [name, setName] = useState("")
    //   const [email, setEmail] = useState("")
    //   const [image, setImage] = useState()
    //   const [map, setMap] = useState([])

    //   const getImage = (e) => {
    //     let file = e.target.files[0]
    //     setImage(file)
    //   }
    //   const getMap = (data) => {
    //     console.log("get map data in function", data.response.venues)
    //     setMap(data.response.venues)

    //   }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        < >
            <Button variant="secondary" onClick={handleShow}>
                Sold Tokens
        </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Token Bought By</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <ol>
                        {userList && userList.map(items => {
                            return (

                                <li>
                                    <div className="soldTokenModal" class="shadow-lg p-3 mb-5 bg-white rounded " >

                                        <h6>Name: {items.name}</h6>
                                        <h6>Email: {items.email}</h6>
                                        <div> <img src={items.image} style={{ width: "90px", height: "90px", marginBottom: "10px" }} /></div>

                                    </div>

                                </li>
                            )
                        })}
                    </ol>

                    {/* <input placeholder="Name of the company" onChange={(e) => { setCompName(e.target.value) }} />
          <br /> */}
                    {/* <input  placeholder="since" onChange={(e)=>{setAddress(e.target.value)}}/> */}
                    {/* <br /> */}
                    {/* <input placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>
          <input placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="file"  onChange={(e)=>{setImage(e.target.files[0])}} /> */}
                    {/* <br />
          <br /> */}
                    {/* <input type="file" onChange={getImage} />
          <br />
          <br /> */}
                    {/* <label>Select location</label>
          <select onChange={e => { setAddress(e.target.value) }}>
            {map && map.map(items => <option value={items.name}>{items.name}</option>)}
          </select>
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `250px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            getmap={getMap}
          /> */}



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Add
            </Button> */}
                </Modal.Footer>
            </Modal>
        </>

    );
}


export default Example;