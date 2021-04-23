import React from 'react'
import RouteSelector from '../routeSelector/Routeselector'
import { useHistory } from 'react-router-dom'
//import SeatSelection from '../SeatSelection/SeatSelection'
//import PaymentTab from '../PaymentTab/PaymentTab'
import Button from '@material-ui/core/Button'

export default function RouteSelection({ history }) {
    const styleObj = {
        // fontSize: 40,
      
        textAlign: "center",
        paddingTop: "10px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: `100%`,
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

 /*    const handleUserIcon = e => {
        e.preventDefault()
        history.push('/profile')
    }
    
    

    

    const handleSignOut = e => {
        e.preventDefault()
        sessionStorage.removeItem('authToken')
        localStorage.removeItem('reservedSeats')
        localStorage.removeItem('nameData')
        localStorage.clear()
        history.push('/')
    }

    const handleLogoClick = e => {
        e.preventDefault()
        history.push('/routes')
    } */
    
    return (
        (localStorage.getItem('userid')===null ||localStorage.getItem('userid')===undefined)?(
            <div >
              <br/><br/><br/><br/>
              
              <h3 style={styleObj} >**You have not logged in, Please Login!!!</h3>
              <Button fullWidth variant="contained" margin="normal" color="primary" onClick={handleSignIn} style={{backgroundColor:'black'}} >
                    {'Sign In'} 
                  </Button>
                  <hr></hr>
                  <Button fullWidth variant="contained" margin="normal" color="primary" onClick={handleRegister} style={{backgroundColor:'black'}} >
                    {'Register'} 
                  </Button>
                
              </div>):
            (
        <div className="container">
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <div>
                <RouteSelector />
            </div>

        </div>
    ))
}
