import React, { Component } from "react";
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
//import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { FormErrors } from './FormErrors';
import { useHistory } from 'react-router-dom'


class Book extends React.Component {
  constructor() {
    super();
    this.state = {
      source: '',
      destination: '',
      depart: '',
      return: '',
      selectedOption: 'oneway',
      availableBuses: '',
      //user: '',
      formErrors: {
        source: '', destination: '', //user: '', 
        depart: '', return: ''
      },
      //userValid: false,
      sourceValid: false,
      destinationValid: false,
      dateValid: false,
      formValid: false,
      localStorageAuthKey: 'twtr:auth'
    }
    // this._handleSubmit = this._handleSubmit.bind(this);
  }


  getAccessToken() {
    if (typeof Storage !== 'undefined') {
      try {
        var keys = JSON.parse(localStorage.getItem(this.state.localStorageAuthKey));
        alert("hi");
        console.log("keys: ", keys.access);
        return keys.access;
        // the refresh token is keys.refresh

      } catch (ex) {
        alert("hi");
        console.log(ex);
      }
    } else {
      alert("hielse");
      // No web storage Support :-(
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  
handleOptionChange= (e) => {
  this.setState({
    selectedOption: e.target.value
  });
}


  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    //let userValid = this.state.userValid;
    let sourceValid = this.state.sourceValid;
    let destinationValid = this.state.destinationValid;
    let dateValid = this.state.dateValid;
    let reg = new RegExp(/^[a-z ,.'-]+$/i);
    let regDate = new RegExp(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/);
    switch (fieldName) {
      case 'source':
        sourceValid = (value.length === 0 || reg.test(value));
        fieldValidationErrors.source = sourceValid ? '' : ' is invalid or too short';
        break;
      case 'destination':
        destinationValid = (value.length === 0 || reg.test(value)) && this.state.source != this.state.destination
        fieldValidationErrors.destination = destinationValid ? '' : ' is too short or invalid';
        break;
      /* case 'user':
        userValid = (value.length === 0 || reg.test(value));
        fieldValidationErrors.user = userValid ? '' : ' is too short or invalid';
        break; */
      case 'date':
        var today = new Date();
        dateValid = value.length === 0 || (!reg.test(value) && regDate.test(value) && this.state.date >= today) ;
        fieldValidationErrors.date = dateValid ? '' : ' is too short or invalid';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      sourceValid: sourceValid,
      destinationValid: destinationValid,
      // userValid: userValid,
      dateValid: dateValid
    }, this.validateForm);
  }

  

  validateForm() {
    this.setState({
      formValid: this.state.sourceValid && this.state.destinationValid && //this.state.userValid && 
        this.state.dateValid
    });
  }


  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  book(item) {

    var keys = JSON.parse(localStorage.getItem(this.state.localStorageAuthKey));
    alert("hi");
    console.log("keys: ", keys);
    // keys.access;

    if (keys == null) {
      alert("Please login!!");
      return;
    }

    fetch('http://localhost:5000/book', {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({
        source: item.source, destination: item.destination, busnumber: item.busnumber, date: item.date,
        startTime: item.startTime, endTime: item.endTime, //user: this.state.user, 
        accesstoken: (keys !== null) ? keys.access : 0//()=>{this.getAccessToken()}
      })
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        //if(data.contains("401")){
        //  alert(data);
        // }
        // else{
        alert(data);//"Booked successfully! " + 
        //}

      })
      .catch(error => {
        alert("Booking failed!");
        console.log('Request failed', error)
      });
  }


  handleSubmit(event) {
    event.preventDefault();
    const { source, destination, //user, 
      date } = this.state;

    fetch('http://localhost:5000/checkAvailability', {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({ source: this.state.source, destination: this.state.destination, date: this.state.date })
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data)
        this.setState({
          availableBuses: <tbody>{data.map((item, index) => (<tr><td key={index}>{item.source}</td><td key={index}>{item.destination}</td><td key={index}>{item.busnumber}</td><td key={index}>{item.date}</td><td key={index}>{item.startTime}</td><td key={index}>{item.endTime}</td>
            <td><input type="button" value="Book" onClick={this.book.bind(this, item)} /></td></tr>))}</tbody>
        })
        console.log('Request successful', data);
        //alert(data);

      })
      .catch(error => {
        this.setState({ availableBuses: "This is an error page!!" })
        console.log('Request failed', error)
      });
    // window.location.reload();

  }

  render() {
    const availableBuseslist = this.state.availableBuses;
    console.log(availableBuseslist.length)
    console.log(availableBuseslist)
    return (
      <React.Fragment>
        <Paper elevation={6}>
          <div>
            <br></br><br></br> <br></br><br></br>
            <Typography component="h1" variant="h5">
              {''}
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <div className="radio">
                <label>
                  <input type="radio" value="oneway"
                    checked={this.state.selectedOption === 'oneway'}
                    onChange={this.handleOptionChange} />
                    One way
                 </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="round"
                    checked={this.state.selectedOption === 'round'}
                    onChange={this.handleOptionChange} />
                    Round trip
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="multicity"
                    checked={this.state.selectedOption === 'multicity'}
                    onChange={this.handleOptionChange} />
                    Multi-city
                </label>
              </div>
              <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
              </div>{/* 
              <div className={`form-group ${this.errorClass(this.state.formErrors.user)}`}>
                <TextField
                  value={this.state.user}
                  className="form-control" name="user"
                  onChange={this.handleUserInput}
                  type="text"
                  placeholder="User"
                  variant="outlined"
                  margin="normal"
                /></div><br></br> */}
              <div className={`form-group ${this.errorClass(this.state.formErrors.source)}`}>
                <TextField
                  className="form-control"
                  name="source"
                  value={this.state.source}
                  onChange={this.handleUserInput}
                  type="text"
                  placeholder="Source"
                  variant="outlined"
                  margin="normal"
                /><br /><br /></div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.destination)}`}>
                <TextField
                  name="destination"
                  className="form-control"
                  value={this.state.destination}
                  onChange={this.handleUserInput}
                  type="text"
                  placeholder="Destination"
                  variant="outlined"
                  margin="normal"
                /><br /><br /></div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.date)}`}>
                <TextField
                  name="date"
                  className="form-control"
                  value={this.state.date}
                  onChange={this.handleUserInput}
                  type="text"
                  placeholder="date"
                  variant="outlined"
                  margin="normal"
                /><br /><br /></div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.date)}`}>
                <TextField
                  name="date"
                  className="form-control"
                  value={this.state.date}
                  onChange={this.handleUserInput}
                  type="text"
                  placeholder="date"
                  variant="outlined"
                  margin="normal"
                /><br /><br /></div>
              <input type="submit" value="Check Availability" className="btn btn-primary" disabled={!this.state.formValid}
                onClick={this.handleSubmit.bind(this)} />
            </form>
            <br></br>
            <table border='1'>
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Bus Number</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Book</th>
                </tr>
              </thead>
              {this.state.availableBuses}
            </table>
            <br></br><br></br>
          </div>
        </Paper>
      </React.Fragment >
    )
  }
}




export default Book
