import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Appbar from './components/Appbar.js';
import './App.css';
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
            <Route path="/" exact component={() => <Appbar />} />
            <Route path="*" exact component={() => <NotFoundPage />} />
          </Switch>
        </Router>
        {/* <Appbar /> */}
      </React.Fragment>
    );
  }
}

export default App;
