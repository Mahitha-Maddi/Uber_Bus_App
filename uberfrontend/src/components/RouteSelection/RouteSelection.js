import React from 'react'
import RouteSelector from '../routeSelector/Routeselector'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'

export default function RouteSelection({ history }) {
  const styleObj = {
    paddingTop: "40px",
    paddingBottom: "40px",
    fontStyle: 'italic',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    height: `100%`,
    backgroundColor: '#C0C0C0',

  }

  const buttonS = {
    backgroundColor: 'black',
    paddingTop: "10px",
    width: '50%',
    justifyContent: 'center',
    marginLeft: '25%',
  }

  const history1 = useHistory();

  const handleSignIn = () => {
    console.log("doing something");
    history1.push("/signin")
  }
  const handleRegister = () => {
    console.log("doing something");
    history1.push("/signup")
  }

  return (
    (localStorage.getItem('userid') === null || localStorage.getItem('userid') === undefined) ? (
      <div >
        <br /><br /><br /><br />

        <h3 style={styleObj} >**You have not logged in, Please Login!!!</h3>
        <Button fullWidth variant="contained" margin="normal" color="primary" onClick={handleSignIn} style={buttonS} >
          {'Sign In'}
        </Button>
        <br></br><br></br>
        <Button fullWidth variant="contained" margin="normal" color="primary" onClick={handleRegister} style={buttonS} >
          {'Register'}
        </Button>

      </div>) :
      (
        <div className="container">
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <div>
            <RouteSelector />
          </div>

        </div>
      ))
}
