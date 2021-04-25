import React, { useState } from "react";
//import React, { useState, useStyles } from "react";
import "./Routeselector.css";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Container, Grid } from "@material-ui/core";
//import * as apiCall from './routeApifunc'
import BusList from "../BusList/BusList";
import { FaAlignLeft } from "react-icons/fa";


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
    margin: 10,
    // height:10
  },
  //style for font size
  resize: {
    fontSize: 15
  },
}))
export default function Routeselector() {
  const classes = useStyles();
  const [dataInp, setData] = useState("");
  const [startCity, setStartCity] = useState("Source");
  const [destination, setDestination] = useState("Destination");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [errorText, setErrorText] = useState("");
  const [errorsource, setErrorsource] = useState(false);
  const [errordestination, setErrordestination] = useState(false);
  const [helpersource, setHelpersource] = useState("");
  const [helperdestination, setHelperdestination] = useState("");

  const handleToCity = (e) => {
    // e.preventDefault()

    if (e.target.value == "") {
      setErrordestination(true);
      setHelperdestination("Please select the destination");
    } else {
      setErrordestination(false);
      setHelperdestination("");
    }
    // setDestination({ destination: e.target.value })
    setDestination(e.target.value);
    localStorage.setItem("destination", e.target.value);
    console.log("destination", e.target.value);
  };

  const renderBusList = (dataInp) => {
    if (errorText.length !== 0) {
      return <div>Source and destination cannot be same!</div>;
    } else if (error1.length !== 0) {
      return <div>Overlapping period!!</div>;
    } else if (Object.keys(dataInp).length > 0) {
      return <BusList value={dataInp} />;
    }
  };

  const handleFromCity = (e) => {
    e.preventDefault();

    console.log(startCity);

    if (e.target.value == "") {
      setErrorsource(true);
      setHelpersource("Please select the origin");
    } else {
      setErrorsource(false);
      setHelpersource("");
    }

    setStartCity(e.target.value);
    localStorage.setItem("start", e.target.value);
    console.log("start", e.target.value);
  };

  const handleDate = (e) => {
    e.preventDefault();
    //    console.log(e.target.value)
    setDate({ date: e.target.value });
    localStorage.setItem("date", e.target.value);
  };

  const getRoutes = (e) => {
    e.preventDefault();
    console.log(startCity, destination);

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

    // fetch('http://localhost:5000/checkAvailability', {
    fetch("/checkAvailability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: startCity,
        destination: destination,
        date: date.date,
        user: localStorage.getItem("username"),
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("our date:", data);
        setData(data);

        if (data === 401) {
          setError1("invalid");
        } else {
          setError1("");
          if (data.length <= 0) {
            alert("Sorry no buses are available for this combination!!")
          }
        }
      })
      .catch((error) => {
        // this.setState({ availableBuses: "This is an error page!!" })
        console.log("Request failed", error);
        alert(error);
        //setError(error);
      });
  };
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
      <div className="form-group inline "></div>
      <div className="main-container">
        <form className="form-inline" onSubmit={(e) => getRoutes(e)}>

          <div>
            <TextField
              id="standard-select-Source"
              select
              label="Source City"
              required
              //margin="normal"
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              value={startCity}
              className={classes.textField}
              autoFocus={true}
              onChange={(e) => {
                handleFromCity(e);
              }}
              /* SelectProps={{
                native: true,
              }}  */
              helperText={helpersource}
            >
              <option value={"New York"}>New York</option>
              <option value={"Boston"}>Boston</option>
              <option value={"Chicago"}>Chicago</option>
              <option value={"Charleston"}>Charleston</option>
              <option value={"New-Orleans"}>New-Orleans</option>
              <option value={"San-Fransisco"}>San-Fransisco</option>
              <option value={"Savannah"}>Savannah</option>

            </TextField>

          </div>

          <div
            style={{
              display: "inline",
              // float: "right",
              paddingLeft: "40px",
            }}
          ></div>

          <div
            style={{
              display: "inline",
              // float: "right",
              paddingLeft: "20px",
            }}
          ></div>


          <div>
            <TextField
              id="standard-select-Destination"
              select
              label="Destination City"
              required
              //margin="normal"
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              value={destination}
              className={classes.textField}
              autoFocus={true}
              onChange={(e) => {
                handleToCity(e);
              }}
              /* SelectProps={{
                native: true,
              }}  */
              helperText={helperdestination}
            >
              <option value={"Boston"}>Boston</option>
              <option value={"New York"}>New York</option>
              <option value={"Chicago"}>Chicago</option>
              <option value={"Charleston"}>Charleston</option>
              <option value={"New-Orleans"}>New-Orleans</option>
              <option value={"San-Fransisco"}>San-Fransisco</option>
              <option value={"Savannah"}>Savannah</option>

            </TextField>

          </div>

          <div
            style={{
              display: "inline",
              // float: "right",
              paddingLeft: "30px",
            }}
          ></div>

          <div
            style={{
              display: "inline",
              // float: "right",
              paddingLeft: "30px",
            }}
          ></div>
          <div>
            <TextField
              id="date"
              label="Travel Date"
              type="date"
              onChange={(e) => {
                handleDate(e);
              }}
              defaultValue={date}
              // className={classes.textField}
              inputProps={{
                classes: {
                  input: classes.textField,
                },
                min: formatDate(new Date()),
              }}
              InputLabelProps={{
                shrink: true,
              }}
              required
              autoFocus={true}
            />
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <div>

            <input type="submit" className="btn btn-dark classes.resize" />

          </div>
        </form>
        <div>{renderBusList(dataInp)}</div>
      </div>
    </div>
  );
}
