import React, { Component } from "react";
import BookingService from "./bookingService";

class UpdateBookingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,

      firstName: "",

      lastName: "",

      emailId: "",
    };

    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);

    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);

    this.updateBooking = this.updateBooking.bind(this);
  }

  componentDidMount() {
    BookingService.getBookingById(this.state.id).then((res) => {
      let booking = res.data;

      this.setState({
        firstName: booking.firstName,

       lastName: booking.lastName,

        emailId: booking.emailId,
      });
    });
  }

  updateBooking = (e) => {
    e.preventDefault();

    let booking = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailId: this.state.emailId,
    };

    console.log("booking => " + JSON.stringify(booking));

    console.log("id => " + JSON.stringify(this.state.id));

    BookingService.updateBooking(booking, this.state.id).then((res) => {
      this.props.history.push("/bookings");
    });
  };

  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ emailId: event.target.value });
  };

  cancel() {
    this.props.history.push("/bookings");
  }

  render() {
    return (
      <div>
        <br></br>

        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Update Booking</h3>

              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> First Name: </label>

                    <input
                      placeholder="First Name"
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Last Name: </label>

                    <input
                      placeholder="Last Name"
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Email Id: </label>

                    <input
                      placeholder="Email Address"
                      name="emailId"
                      className="form-control"
                      value={this.state.emailId}
                      onChange={this.changeEmailHandler}
                    />
                  </div>

                  <button className="btn btn-success" onClick={this.updateBooking}>
                    Save
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateBookingComponent;
