import React, { useState, useEffect } from 'react'
import { FaAngleDoubleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Edit, TextInput, SimpleForm, required } from 'react-admin';
import './Tab.css';
import PayPal from "../PaymentTab/PayPal";
export default function SeatSelection() {
    const [name, setName] = useState([])
    const [fA, setFA] = useState([])
    const [fB, setFB] = useState([])
    const [fC, setFC] = useState([])
    const [sA, setSA] = useState([])
    const [sB, setSB] = useState([])
    const [sC, setSC] = useState([])
    const [tA, setTA] = useState([])
    const [tB, setTB] = useState([])
    const [tC, setTC] = useState([])
    const [arrowDown, setArrowDown] = useState(false)
    const [gender, setGender] = useState([])
    const [reservedSeat, setReservedSeat] = useState([])
    const [seatNumber, setSeatnumber] = useState([])
    const [passengers, setPassengers] = useState([])
    const [checkout, setCheckOut] = useState(false);
    //const [passengerNames, setPassengerNames] = useState([])

    const [passengerGender1A, setPassengerGender1A] = useState("")
    const [passengerName1A, setPassengerName1A] = useState("")
    const [passengerGender1B, setPassengerGender1B] = useState("")
    const [passengerName1B, setPassengerName1B] = useState("")
    const [passengerGender1C, setPassengerGender1C] = useState("")
    const [passengerName1C, setPassengerName1C] = useState("")

    const [passengerGender2A, setPassengerGender2A] = useState("")
    const [passengerName2A, setPassengerName2A] = useState("")
    const [passengerGender2B, setPassengerGender2B] = useState("")
    const [passengerName2B, setPassengerName2B] = useState("")
    const [passengerGender2C, setPassengerGender2C] = useState("")
    const [passengerName2C, setPassengerName2C] = useState("")


    const [passengerGender3A, setPassengerGender3A] = useState("")
    const [passengerName3A, setPassengerName3A] = useState("")
    const [passengerGender3B, setPassengerGender3B] = useState("")
    const [passengerName3B, setPassengerName3B] = useState("")
    const [passengerGender3C, setPassengerGender3C] = useState("")
    const [passengerName3C, setPassengerName3C] = useState("")
    const history = useHistory()

    useEffect(() => {
        //let bId = localStorage.getItem('selectedBusId')
        console.log(localStorage.getItem('selectedBusId'))
        const paramdict = {
            'busid': localStorage.getItem('selectedBusId')
        }
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paramdict)
        }
        fetch("/availableseats", config)
            .then(res => res.json())
            .then(data => {
                setFA(data[0].FA)
                //console.log("date: ",data)
                // console.log("FA",data[0].FA)
                setFB(data[0].FB)
                setFC(data[0].FC)
                setSA(data[0].SA)
                setSB(data[0].SB)
                setSC(data[0].SC)
                setTA(data[0].TA)
                setTB(data[0].TB)
                setTC(data[0].TC)
                localStorage.setItem("1A", data[0].FA)
                localStorage.setItem("1B", data[0].FB)
                localStorage.setItem("1C", data[0].FC)
                localStorage.setItem("2A", data[0].SA)
                localStorage.setItem("2B", data[0].SB)
                localStorage.setItem("2C", data[0].SC)
                localStorage.setItem("3A", data[0].TA)
                localStorage.setItem("3B", data[0].TB)
                localStorage.setItem("3C", data[0].TC)
                /*   const list = []
                  if (data[0].FA === 1) {
                      list.push("1A")
                  }
                  if (data[0].FB === 1) {
                      list.push("1B")
                  }
                  if (data[0].FC == 1) {
                      list.push("1C")
                  }
                  if (data[0].SA == 1) {
                      list.push("2A")
                  }
                  if (data[0].SB == 1) {
                      list.push("2B")
                  }
                  if (data[0].SC == 1) {
                      list.push("2C")
                  }
                  if (data[0].TA == 1) {
                      list.push("3A")
                  }
                  if (data[0].TB == 1) {
                      list.push("3B")
                  }
                  if (data[0].TC == 1) {
                      list.push("3C")
                  } */

                //setReservedSeat(list)

                //console.log(reservedSeat)
            })
    })

    const getSeatNumber = (e) => {

        let newSeat = e.target.value
        /*  if (reservedSeat.includes(newSeat)) {
             e.disabled = true */
        if (seatNumber.includes(newSeat)) {
            setSeatnumber(seatNumber.filter(seat => seat !== newSeat))
        }
        //} 
        else {
            setSeatnumber([...seatNumber, newSeat])
            //setReservedSeat([...reservedSeat, newSeat])
            console.log(seatNumber)
        }
        renderPassengerData(seatNumber)
    }
    const handleGender = (e, seatNo) => {
        const { value } = e.target
        /*  setGender(gender.concat(value))
        // console.log(value)
        setPassengerGenders([...passengerGenders, {seat:seatNo, gender:value} ])
        console.log(passengerGenders) */
        if (seatNo === "1A") {
            setPassengerGender1A(value);
        }
        else if (seatNo === "1B") {
            setPassengerGender1B(value);
        }
        else if (seatNo === "1C") {
            setPassengerGender1C(value);

            console.log(passengerGender1C)
        }
        else if (seatNo === "2A") {
            setPassengerGender2A(value);
        }
        else if (seatNo === "2B") {
            setPassengerGender2B(value);
        }
        else if (seatNo === "2C") {
            setPassengerGender2C(value);
        }
        else if (seatNo === "3A") {
            setPassengerGender3A(value);
        }
        else if (seatNo === "3B") {
            setPassengerGender3B(value);
        }
        else if (seatNo === "3C") {
            setPassengerGender3C(value);
        }
    }

    const handlePassengerName = (e, seatNo) => {
        e.preventDefault()
        let value = e.target.value
        /* // console.log(value)
        if (!value) {
            return (setName("name is required"))
        } else {
            setName(name.concat(value))
            setPassengerNames([...passengerNames, {seat:seatNo, name:value}  ])
            console.log(passengerNames)
        } */
        if (seatNo === "1A") {
            setPassengerName1A(value);
        }
        else if (seatNo === "1B") {
            setPassengerName1B(value);
        }
        else if (seatNo === "1C") {
            setPassengerName1C(value);

            console.log(passengerName1C)
        }
        else if (seatNo === "2A") {
            setPassengerName2A(value);
        }
        else if (seatNo === "2B") {
            setPassengerName2B(value);
        }
        else if (seatNo === "2C") {
            setPassengerName2C(value);
        }
        else if (seatNo === "3A") {
            setPassengerName3A(value);
        }
        else if (seatNo === "3B") {
            setPassengerName3B(value);
        }
        else if (seatNo === "3C") {
            setPassengerName3C(value);
        }

    }
    const handleSubmitDetails = e => {
        e.preventDefault()
        //setCheckOut(true);
        //setArrowDown(true)
        //localStorage.setItem("reservedSeats", JSON.stringify(seatNumber))
        //localStorage.setItem("nameData", JSON.stringify(name))
        const x = []
        if (seatNumber.includes("1A")) {
            x.push({ seatNo: "1A", passengerName: passengerName1A, passengerGender: passengerGender1A })
        }
        if (seatNumber.includes("1B")) {
            x.push({ seatNo: "1B", passengerName: passengerName1B, passengerGender: passengerGender1B })
        }
        if (seatNumber.includes("1C")) {
            x.push({ seatNo: "1C", passengerName: passengerName1C, passengerGender: passengerGender1C })
        }

        if (seatNumber.includes("2A")) {
            x.push({ seatNo: "2A", passengerName: passengerName2A, passengerGender: passengerGender2A })
        }
        if (seatNumber.includes("2B")) {
            x.push({ seatNo: "2B", passengerName: passengerName2B, passengerGender: passengerGender2B })
        }
        if (seatNumber.includes("2C")) {
            x.push({ seatNo: "2C", passengerName: passengerName2C, passengerGender: passengerGender2C })
        }

        if (seatNumber.includes("3A")) {
            x.push({ seatNo: "3A", passengerName: passengerName3A, passengerGender: passengerGender3A })
        }
        if (seatNumber.includes("3B")) {
            x.push({ seatNo: "3B", passengerName: passengerName3B, passengerGender: passengerGender3B })
        }
        if (seatNumber.includes("3C")) {
            x.push({ seatNo: "3C", passengerName: passengerName3C, passengerGender: passengerGender3C })
        }
        //console.log(x)
        //setPassengers(x)
        localStorage.setItem('passengers', JSON.stringify(x));
        localStorage.setItem('seatNumber', seatNumber);
        localStorage.setItem('numOfSeats', x.length);
        console.log("x:length: ", x.length);
        console.log("Passengers: ", localStorage.getItem('passengers'));
        //seatNumber.forEach(d => console.log("mine:", { d }))
        seatNumber.map((seat) => {
            console.log("minemap:", { seat: seat });
            if (seat.includes("1A")) {
                localStorage.setItem("1A", 1);
                alert("1A: "+localStorage.getItem("1A"))
            }
            if (seat.includes("1B")) {
                localStorage.setItem("1B", 1);
                alert("1B: "+localStorage.getItem("1B"))
            }
            if (seat.includes("1C")) {
                localStorage.setItem("1C", 1);
                alert("1C: "+localStorage.getItem("1C"))
            }
            if (seat.includes("2A")) {
                localStorage.setItem("2A", 1);
                alert("2A: "+localStorage.getItem("2A"))
            }
            if (seat.includes("2B")) {
                localStorage.setItem("2B", 1);
                alert("2B: "+localStorage.getItem("2B"))
            }
            if (seat.includes("2C")) {
                localStorage.setItem("2C", 1);
                alert("2C: "+localStorage.getItem("2C"))
            }
            if (seat.includes("3A")) {
                localStorage.setItem("3A", 1);
                alert("3A: "+localStorage.getItem("3A"))
            }
            if (seat.includes("3B")) {
                localStorage.setItem("3B", 1);
                alert("3B: "+localStorage.getItem("3B"))
            }
            if (seat.includes("3C")) {
                localStorage.setItem("3C", 1);
                alert("3C: "+localStorage.getItem("3C"))
            }


        })
        history.push('/payment/');
        return (<Redirect to="/payment/" />)
    }

    const renderPassengerData = (seatArray) => {
        return seatArray.map((seat, idx) => {
            return (
                <form key={idx} className="form seatfrm">
                    <p class="text-capitalize text-center">Seat No:{seat}</p>
                    <input className="form-control seatInp" onKeyUp={e => handlePassengerName(e, seat)} type="text" name="passenger-name" placeholder="Enter Name" validate={required()} />
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gender" id="male" value="Male" onClick={e => handleGender(e, seat)} />
                        <label class="form-check-label" for="male">Male</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gender" id="female" value="Female" onClick={e => handleGender(e, seat)} />
                        <label class="form-check-label" htmlFor="female">Female</label>
                    </div>
                </form>)

        })
    }
    return (
        <div>
            <br /><br /><br /><br /><br /><br />
            <Link to="/Book">back</Link>
            <div className="ss">
                <br /><br /><br /><br /><br /><br /><br /><br />
                <div className="row">
                    <div className="column1">
                        <div className="plane">

                            <form onChange={e => getSeatNumber(e)}>
                                <ol className="cabin fuselage">
                                    <li className="row row--1">
                                        <ol className="seats" type="A">
                                            <li className="seat">
                                                <input type="checkbox" disabled={fA} value="1A" id="1A" />
                                                <label htmlFor="1A">1A</label>
                                            </li>
                                            <li className="seat">
                                                <input type="checkbox" disabled={fB} id="1B" value="1B" />
                                                <label htmlFor="1B">1B</label>
                                            </li>
                                            <li className="seat">
                                                <input type="checkbox" disabled={fC} value="1C" id="1C" />
                                                <label htmlFor="1C">1C</label>
                                            </li>
                                        </ol>
                                    </li>
                                    <li className="row row--2">
                                        <ol className="seats" type="A">
                                            <li className="seat">
                                                <input type="checkbox" disabled={sA} value="2A" id="2A" />
                                                <label htmlFor="2A">2A</label>
                                            </li>
                                            <li className="seat">
                                                <input type="checkbox" disabled={sB} value="2B" id="2B" />
                                                <label htmlFor="2B">2B</label>
                                            </li>
                                            <li className="seat">
                                                <input type="checkbox" disabled={sC} value="2C" id="2C" />
                                                <label htmlFor="2C">2C</label>
                                            </li>

                                        </ol>
                                    </li>
                                    <li className="row row--3">
                                        <ol className="seats" type="A">
                                            <li className="seat">
                                                <input type="checkbox" disabled={tA} value="3A" id="3A" />
                                                <label htmlFor="3A">3A</label>
                                            </li>
                                            <li className="seat">
                                                <input type="checkbox" disabled={tB} value="3B" id="3B" />
                                                <label htmlFor="3B">3B</label>
                                            </li>
                                            <li className="seat">
                                                <input type="checkbox" disabled={tC} value="3C" id="3C" />
                                                <label htmlFor="3C">3C</label>
                                            </li>

                                        </ol>
                                    </li>
                                </ol>
                            </form>
                        </div>
                    </div>
                    <div className="column2">
                        <div className="seatInfo">
                            <form className="form-group">
                                {renderPassengerData(seatNumber)}
                            </form>
                            <div>
                                {/*   <button onClick={e => handleSubmitDetails(e)} className="btn btn-info seatBT">
                                    Save and pay
                            </button> */}

                                <div className="App">

                                    {checkout ? (<PayPal />) : (<button onClick={e => handleSubmitDetails(e)} className="btn btn-info seatBT">checkout
                                    </button>)}
                                </div>
                            </div>
                            <div className={arrowDown ? "activeArrow2" : "nonActive"}>
                                <FaAngleDoubleDown />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
