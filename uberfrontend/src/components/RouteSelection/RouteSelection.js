import React from 'react'
import RouteSelector from '../routeSelector/Routeselector'
//import SeatSelection from '../SeatSelection/SeatSelection'
//import PaymentTab from '../PaymentTab/PaymentTab'

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
        (localStorage.getItem('userid')===null ||localStorage.getItem('userid')===undefined)?(<div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <h2 style={styleObj}>You have not logged in, Please Login!!!</h2></div>):
            (
        <div className="container">
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <div>
                <RouteSelector />
            </div>

        </div>
    ))
}
