import React, { useState, useStyles } from "react";
import "./Routeselector.css";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Container, Grid } from "@material-ui/core";
import BusList from "../BusList/BusList";
import { FaAlignLeft } from "react-icons/fa";
import Footer from "../../pages/Footer";
export default function Routeselector() {
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
    if (e.target.value == "") {
      setErrordestination(true);
      setHelperdestination("Please select the destination");
    } else {
      setErrordestination(false);
      setHelperdestination("");
    }
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

          <FormControl
            error={errorsource}
          >
            Source City
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={startCity}
              onChange={(e) => {
                handleFromCity(e);
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"New York"}>New York</MenuItem>
              <MenuItem value={"Boston"}>Boston</MenuItem>
              <MenuItem value={"Chicago"}>Chicago</MenuItem>
              <MenuItem value={"Charleston"}>Charleston</MenuItem>
              <MenuItem value={"New-Orleans"}>New-Orleans</MenuItem>
              <MenuItem value={"San-Fransisco"}>San-Fransisco</MenuItem>
              <MenuItem value={"Savannah"}>Savannah</MenuItem>
            </Select>
            <FormHelperText>{helpersource}</FormHelperText>
          </FormControl>

          <div
            style={{
              display: "inline",
              paddingLeft: "20px",
            }}
          ></div>
          <FormControl
            error={errordestination}
          >
            Destination City
            <Select
              labelId="demo-simple-select-helper-label"
              label=" Destination City "
              id="demo-simple-select-helper"
              value={destination}
              onChange={(e) => {
                handleToCity(e);
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"New York"}>New York</MenuItem>
              <MenuItem value={"Boston"}>Boston</MenuItem>
              <MenuItem value={"Chicago"}>Chicago</MenuItem>
              <MenuItem value={"Charleston"}>Charleston</MenuItem>
              <MenuItem value={"New-Orleans"}>New-Orleans</MenuItem>
              <MenuItem value={"San-Fransisco"}>San-Fransisco</MenuItem>
              <MenuItem value={"Savannah"}>Savannah</MenuItem>
            </Select>
            <FormHelperText>{helperdestination}</FormHelperText>
          </FormControl>
          <div
            style={{
              // float: "right",
              paddingLeft: "20px",
            }}
          >

            <TextField
              id="date"
              label="Date of Journey"
              type="date"
              onChange={(e) => {
                handleDate(e);
              }}
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
          <br></br>
          <hr></hr>
          <div class="container">
            <br></br>
            <br></br>
            <input type="submit" className="btn btn-dark" />
          </div>
        </form>
        <div>{renderBusList(dataInp)}</div>
      </div>
    </div>
  );
}
