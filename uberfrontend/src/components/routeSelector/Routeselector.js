import React, { useState } from 'react'
import './Routeselector.css'
//import * as apiCall from './routeApifunc'
import BusList from '../BusList/BusList'
export default function Routeselector() {
    const [dataInp, setData] = useState("")
    const [startCity, setStartCity] = useState('')
    const [destination, setDestination] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState('')
    const handleToCity = e => {
        e.preventDefault()
        setDestination({ destination: e.target.value })
        localStorage.setItem("destination", e.target.value)
    }
    const renderBusList = (dataInp) => {
        
        if(error.length!==0){
            
            return (<div>Overlapping period!!</div>)
        }
        else 
        if (Object.keys(dataInp).length > 0) {
            return (<BusList value={dataInp} />)
        }
        
    }
    const handleFromCity = e => {
        e.preventDefault()
        setStartCity({ startCity: e.target.value })
        localStorage.setItem("start", e.target.value)
        // console.log(startCity)
    }

    const handleDate = e => {
        e.preventDefault()
        //    console.log(e.target.value)
        setDate({ date: e.target.value })
        localStorage.setItem("date", e.target.value)
    }

    const getRoutes = e => {
        e.preventDefault()
         console.log(startCity,destination)
         alert("hi")
       /*  apiCall.getRoutesFromApi(startCity.startCity, destination.destination)
            .then(response => response.data)
            .then(data => {
                setData(data.bus)
            }) */

            fetch('http://localhost:5000/checkAvailability', {
                method: 'POST', headers: {
                  'Content-Type': 'application/json'
                }, body: JSON.stringify({ source: startCity.startCity, destination:destination.destination, date: date.date, 
                    user:localStorage.getItem('username') })
              })
                .then(response => {
                  console.log(response);
                  return response.json();
                })
                .then(data => {
                  console.log("our date:",data)
                  setData(data)
                  
                  if(data===401){
                      setError("invalid");
                  }
                  else{
                    setError('');
                  }

                  /* this.setState({
                    availableBuses: <tbody>{data.map((item, index) => (<tr><td key={index}>{item.source}</td><td key={index}>{item.destination}</td><td key={index}>{item.busnumber}</td><td key={index}>{item.date}</td><td key={index}>{item.startTime}</td><td key={index}>{item.endTime}</td>
                      <td><input type="button" value="Book" onClick={this.book.bind(this, item)} /></td></tr>))}</tbody>
                  })
                  console.log('Request successful', data);
                  //alert(data); */
          
                })
                .catch(error => {
                 // this.setState({ availableBuses: "This is an error page!!" })
                  console.log('Request failed', error)
                  alert(error);
                  //setError(error);
                });
    }

  
    
    return (
      
    
    <div className="rdc">
            <div className="form-group inline"></div>
            <div className="main-container">
                <form className="form-inline" onSubmit={e => getRoutes(e)}>
                    <select name="ad_account_selected" data-style="btn-new" class="selectpicker" onChange={e => { handleFromCity(e) }}>
                        <option>FROM</option>
                        <option>Chennai</option>
                        <option>Bangalore</option>
                    </select>
                    <select name="ad_account_selected" data-style="btn-new" class="selectpicker" onChange={e => { handleToCity(e) }}>
                        <option>TO</option>
                        <option>Hyderabad</option>
                        <option>Coimbatore</option>
                        <option>Vishakapatnam</option>
                        <option>Bangalore</option>
                        <option>Chenai</option>
                    </select>
                    <input onChange={e => { handleDate(e) }} type="date"></input>
                    <input type="submit" className=" btn btn-primary btn-md getRoute" />
                </form>
                
                <div>
                     {renderBusList(dataInp)}
                </div>
            
            </div>
        </div>
    )
    
    
}
