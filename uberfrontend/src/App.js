import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Appbar from './components/Appbar.js';
import './App.css';

// import your components:
import Home from "./pages/Home";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import PasswordChange from "./pages/PasswordChange/PasswordChange";
import THome from "./pages/Bookings/Home";
//import Book from "../pages/Book/Book";
//import NotFoundPage from "../pages/Book/NotFoundPage";
import RouteSelection from "./components/RouteSelection/RouteSelection"; ///RouteSelection/RouteSelection';
import SeatSelection from "./components/SeatSelection/SeatSelection";
import PayPal from "./components/PaymentTab/PayPal";
import aboutus from "./pages/AboutUs";
import contactus from "./pages/ContactUs";
import profile from "./pages/Profile/index";
import {NotFoundPage} from "./components";
//import _config from './config'

// routing: https://reactrouter.com/web/api/Hooks
// a2hs: https://dev.to/zvakh/a2hs-how-to-add-the-pwa-to-home-screen-27c4

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/*" exact component={() => <Appbar />} />{/* 
            <Route path="/bookings" exact component={THome} />
            <Route path="/Book" exact render={(props) => <RouteSelection {...props} />}/>
            <Route path="/seatSelection/" exact render={(props) => <SeatSelection {...props} />}/>
            <Route path="/payment/" exact render={(props) => <PayPal {...props} />} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/password_reset" exact component={PasswordReset} />
            <Route path="/password_change" exact component={PasswordChange} />
            <Route path="/aboutus" exact component={aboutus} />
            <Route path="/contactus" exact component={contactus} />
            <Route path="/userprofile" exact component={profile} />
            <Route path="*" exact component={() => <NotFoundPage />} /> */}
          </Switch>
        </Router> 
      {/*  <Appbar />  */}
      </React.Fragment>
    );
  }
}

export default App;
