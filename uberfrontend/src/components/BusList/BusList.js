import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import { FaAngleDoubleDown } from "react-icons/fa";
import { useHistory } from 'react-router-dom'
import './busList.css'
export default function BusList({ value: dataInp }) {

    const [obj, setObj] = useState('')
    const [reset, Setreset] = useState(false)
    const [arrowDown, setArrowDown] = useState(false)
    const [clas, SetClas] = useState(true)


    useEffect(() => {
        setObj(dataInp)
    }, [dataInp])


    const history = useHistory()
    const handleSubmit = (bId,busPrice,source,destination,startTime,endTime,BusNum,busDate) => {
        localStorage.setItem("selectedBusId", bId)
        localStorage.setItem("busPrice", busPrice)
        localStorage.setItem("source",source)
        localStorage.setItem("destination",destination)
        localStorage.setItem("startTime",startTime)
        localStorage.setItem("endTime",endTime)
        localStorage.setItem("BusNum",BusNum)
        localStorage.setItem("busDate",busDate)
        
        SetClas(false)
        setArrowDown(true)
        alert("Hello")
        history.push('/seatSelection/');
        
        return ( <Redirect  to="/seatSelection/" /> )
    }

/* 
    const handleReset = (e) => {
        if (clas === false) {
            Setreset(true)
            SetClas(true)
            setArrowDown(false)
        }
        localStorage.removeItem("selectedBusId")
    } */


    const renderFunction = () => {
        return dataInp.map((bus, idx) => {
            // let bId = bus._id
            return (
                <div key={idx} className="card mt-5 buslist">
                    <br/><br/><br/><br/>
                    <div class="row ml-3">{/* 
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">Brand</div> */}
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">BusNum</div>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">startTime</div>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">endTime</div>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">price</div>

                        <div class="w-100 d-none d-md-block"></div>

                        {/* {console.log(bus.seatArray)}
                        <div class="col-6 col-sm-3 mb-4">{bus.companyName}</div> */}
                        <div class="col-6 col-sm-3 mb-4">{bus.busnumber}</div>
                        <div class="col-6 col-sm-3 mb-4">{bus.startTime}</div>
                        <div class="col-6 col-sm-3 mb-4">{bus.endTime}</div>
                        <div class="col-6 col-sm-3 mb-4">{bus.price}</div>
                        <div class="col-6 col-sm-4 mb-2 ml-0">
                        <Link to="/seatSelection">Book</Link>
                      <button className={clas ? "btn btn-primary btn-md" : "btn btn-primary btn-md disabled"} 
                      onClick={(bId,busPrice,source,destination,startTime,endTime,BusNum,busDate) => { handleSubmit(bus._id,bus.price,bus.source,bus.destination,bus.startTime,bus.endTime,bus.busnumber,bus.date) }} >
                        Book Now</button> 
                        </div>
                      {/*   <div class="col-6 col-sm-4 mb-2 ml-0">
                            <span className={reset ? "badge badge-danger ml-5" : "disabled"} onClick={e => handleReset(e)}>Reset</span>
                        </div> */}
                    </div>
                </div >
            )
        })

    }


    return (
        <div className="">
            {renderFunction()}
            <div className={arrowDown ? "activeArrow" : "nonActive"}>
                <FaAngleDoubleDown />
            </div>
        </div>

    )
}
