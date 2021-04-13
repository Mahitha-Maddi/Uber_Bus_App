import React, { Component } from "react";
import UserService from "./bookingService";

class ListUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookings: [],
    };
    this.editBooking = this.editBooking.bind(this);
    this.deleteBooking = this.deleteBooking.bind(this);
  }

  deleteBooking(id) {
    UserService.deleteBooking(id).then((res) => {
      this.setState({
        bookings: this.state.usbookingsers.filter((user) => bookings.id !== id),
      });
    });
  }
  viewBooking(id) {
    this.props.history.push(`/bookings-results/${id}`);
  }
  editBooking(id) {
    this.props.history.push(`/bookings-results/${id}`); //change path for booking
  }

  componentDidMount() {
    UserService.getBookings().then((res) => {
      this.setState({ users: res.data });
    });
  }

  // addUser(){
  //     this.props.history.push('/add-user/_add');
  // }

  render() {
    return (
      <div>
        <h2 className="text-center">Booking List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addUser}>
            {" "}
            Add User
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> User First Name</th>
                <th> User Last Name</th>
                <th> User Email Id</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user) => (
                <tr key={user.id}>
                  <td> {user.firstName} </td>
                  <td> {user.lastName}</td>
                  <td> {user.emailId}</td>
                  <td>
                    <button
                      onClick={() => this.editBooking(booking.id)}
                      className="btn btn-info"
                    >
                      Update{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteBooking(booking.id)}
                      className="btn btn-danger"
                    >
                      Delete{" "}
                    </button>
                    {/* <button style={{marginLeft: "10px"}} onClick={ () => this.viewUser(user.id)} className="btn btn-info">View </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListUserComponent;
