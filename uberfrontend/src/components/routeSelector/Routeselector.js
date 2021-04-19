import React, { useState, useStyles } from 'react'
import './Routeselector.css'
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
//import * as apiCall from './routeApifunc'
import BusList from '../BusList/BusList'
export default function Routeselector() {
    const [dataInp, setData] = useState("")
    const [startCity, setStartCity] = useState("Source")
    const [destination, setDestination] = useState("Destination")
    const [date, setDate] = useState('')
    const [error, setError] = useState('')
    const [error1, setError1] = useState('')
    const [errorText, setErrorText] = useState("");
    const [errorsource, setErrorsource] = useState(false);
    const [errordestination, setErrordestination] = useState(false);
    const [helpersource, setHelpersource] = useState("");
    const [helperdestination, setHelperdestination] = useState("");

    const handleToCity = e => {
        // e.preventDefault()

        if (e.target.value == "") {
            setErrordestination(true);
            setHelperdestination("Please select the destination");
        } else {
            setErrordestination(false);
            setHelperdestination("");
        }
        // setDestination({ destination: e.target.value })
        setDestination(e.target.value)
        localStorage.setItem("destination", e.target.value)
        console.log("destination", e.target.value)
    }

    const renderBusList = (dataInp) => {

        if(errorText.length!==0){
            return (<div>Source and destination cannot be same!</div>)
        }
        else if (error1.length !== 0) {

            return (<div>Overlapping period!!</div>)
        }
        else
            if (Object.keys(dataInp).length > 0) {
                return (<BusList value={dataInp} />)
            }

    }

    const handleFromCity = e => {
        e.preventDefault()

        console.log(startCity)

        if (e.target.value == "") {
            setErrorsource(true);
            setHelpersource("Please select the origin");
        } else {
            setErrorsource(false);
            setHelpersource("");
        }

        setStartCity(e.target.value)
        localStorage.setItem("start", e.target.value)
        console.log("start", e.target.value)
    }

    const handleDate = e => {
        e.preventDefault()
        //    console.log(e.target.value)
        setDate({ date: e.target.value })
        localStorage.setItem("date", e.target.value)

    }

    const getRoutes = e => {
        e.preventDefault()
        console.log(startCity, destination)

        if (startCity === "Source") {
            setErrorsource(true);
            setHelpersource("Please select the origin");
            return;
        }
        if (destination === "Destination") {
            setErrordestination(true);
            setHelperdestination("Please select the destination");
            return;
        }

        if (startCity === destination) {
            setError(true);
            setErrorText("Source and Destination should be different");
            return;
        } else {
            setError(false);
            setErrorText("");
        }


        fetch('http://localhost:5000/checkAvailability', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                source: startCity, destination: destination, date: date.date,
                user: localStorage.getItem('username')
            })
        })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log("our date:", data)
                setData(data)

                if (data === 401) {
                    setError1("invalid");
                }
                else {
                    setError1('');
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
    function formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    return (


        <div className="rdc">
            <div className="form-group inline"></div>
            <div className="main-container">
                <form className="form-inline" onSubmit={e => getRoutes(e)}>
                    {/* <select name="ad_account_selected" data-style="btn-new" class="selectpicker" onChange={e => { handleFromCity(e) }}>
                        <option>FROM</option>
                        <option>Chennai</option>
                        <option>Bangalore</option>
                    </select> */}
                    <FormControl
                        // className={classes.formControl}
                        error={errorsource}
                    >
                        <InputLabel id="demo-simple-select-helper-label">
                            Source City
                  </InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={startCity}
                            onChange={e => { handleFromCity(e) }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Chennai"}>Chennai</MenuItem>
                            <MenuItem value={"Hyderabad"}>Hyderabad</MenuItem>
                            <MenuItem value={"Bangalore"}>Bangalore</MenuItem>

                        </Select>
                        <FormHelperText>{helpersource}</FormHelperText>
                    </FormControl>

                    <div
                        style={{
                            display: "inline",
                            float: "right",
                            paddingLeft: "200px",
                        }}
                    ></div>
                    {/* <select name="ad_account_selected" data-style="btn-new" class="selectpicker" onChange={e => { handleToCity(e) }}>
                        <option>TO</option>
                        <option>Hyderabad</option>
                        <option>Coimbatore</option>
                        <option>Vishakapatnam</option>
                        <option>Bangalore</option>
                        <option>Chenai</option>
                    </select>
                    <input onChange={e => { handleDate(e) }} type="date"></input> */}
                    <FormControl
                        //   className={classes.formControl}
                        error={errordestination}
                    >
                        <InputLabel id="demo-simple-select-helper-label">
                            Destination City
                  </InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={destination}
                            onChange={e => { handleToCity(e) }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Hyderabad"}>Hyderabad</MenuItem>
                            <MenuItem value={"Coimbatore"}>Coimbatore</MenuItem>
                            <MenuItem value={"Bangalore"}>Bangalore</MenuItem>
                        </Select>
                        <FormHelperText>{helperdestination}</FormHelperText>
                    </FormControl>
                    <div style={{ paddingLeft: "200px" }} >
                        <TextField
                            id="date"
                            label="Date of Journey"
                            type="date"
                            onChange={e => { handleDate(e) }}
                            defaultValue={date}
                            // className={classes.textField}
                            inputProps={{
                                min: formatDate(new Date()),
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </div>
                    <input type="submit" className=" btn btn-dark btn-md getRoute" />
                </form>{/* 
                <div>{errorText}</div> */}
                <div>
                    {renderBusList(dataInp)}
                </div>

            </div>
        </div>
    )


}
