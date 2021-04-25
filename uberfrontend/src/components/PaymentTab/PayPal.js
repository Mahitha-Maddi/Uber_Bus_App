import React, { useState, useRef, useEffect } from "react";
import emailjs from 'emailjs-com';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  }, paper: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
}));
export default function Paypal() {
  const classes = useStyles();
  const paypal = useRef();
  const [totalPrice, setTotalPrice] = useState('')
  const [numOfSeats, setNumOfSeats] = useState([])
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);


  const saveBookedSeats = () => {
    console.log(localStorage.getItem('selectedBusId'))

    const paramdict = {
      'busid': localStorage.getItem('selectedBusId'),
      'seat1A': localStorage.getItem('1A'),
      'seat1B': localStorage.getItem('1B'),
      'seat1C': localStorage.getItem('1C'),
      'seat2A': localStorage.getItem('2A'),
      'seat2B': localStorage.getItem('2B'),
      'seat2C': localStorage.getItem('2C'),
      'seat3A': localStorage.getItem('3A'),
      'seat3B': localStorage.getItem('3B'),
      'seat3C': localStorage.getItem('3C')
    }
    console.log("2c: ", localStorage.getItem("2C"))
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramdict)
    }
    fetch("/saveBookedSeats", config)
      .then(res => res.json())
      .then(data => {

      })
  }

  const saveBooking = () => {
    const passengers = JSON.parse(localStorage.getItem("passengers") || "[]");
    console.log("username: ", localStorage.getItem('username'));
    const seatsBooked = [];
    if (localStorage.getItem('1A') !== 0) {
      seatsBooked.push('1A');
    }
    if (localStorage.getItem('1B') !== 0) {
      seatsBooked.push('1B');
    }
    if (localStorage.getItem('1C') !== 0) {
      seatsBooked.push('1C');
    }
    if (localStorage.getItem('2A') !== 0) {
      seatsBooked.push('2A');
    }
    if (localStorage.getItem('2B') !== 0) {
      seatsBooked.push('2B');
    }
    if (localStorage.getItem('2C') !== 0) {
      seatsBooked.push('2C');
    }
    if (localStorage.getItem('3A') !== 0) {
      seatsBooked.push('3A');
    }
    if (localStorage.getItem('3B') !== 0) {
      seatsBooked.push('3B');
    }
    if (localStorage.getItem('3C') !== 0) {
      seatsBooked.push('3C');
    }
    const paramdict = {
      'busnumber': localStorage.getItem('BusNum'),
      'user': localStorage.getItem('username'),
      'source': localStorage.getItem('source'),
      'destination': localStorage.getItem('destination'),
      'startTime': localStorage.getItem('startTime'),
      'endTime': localStorage.getItem('endTime'),
      'date': localStorage.getItem('busDate'),
      'numOfSeats': localStorage.getItem('numOfSeats'),
      'totalPrice': localStorage.getItem('totalPrice'),
      'seatsBooked': seatsBooked,
      'passengers': passengers
    }
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramdict)
    }
    fetch("/saveBooking", config)
      .then(res => res.json())
      .then(data => {
        alert("Booking saved!! " + data);
        localStorage.setItem('bookingID', data)
      })
  }

  const savePassengerDetails = (fullname, gender, seatNum) => {
    const paramdict = {
      'bookingID': localStorage.getItem('bookingID'),
      'fullname': fullname,
      'gender': gender,
      'seatNumber': seatNum
    }
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramdict)
    }
    fetch("/savePassengerDetails", config)
      .then(res => res.json())
      .then(data => {
        //alert("Saved passenger! " + data);
      })
  }

  const sendEmail = () => {
    var email = 'mahithareddy42@gmail.com';
    const paramdict = {
      'username': localStorage.getItem('username')
    }
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramdict)
    }
    fetch("/userEmail", config)
      .then(res => res.json())
      .then(data => {
        //alert("Saved passenger! " + data);
        console.log(data);
        email = data[0].email;
      })

    const sTime = localStorage.getItem('startTime');
    const s = sTime.split(' ')[1];
    const eTime = localStorage.getItem('endTime');
    const e = eTime.split(' ')[1];
    var templateParams = {
      email_to: email,
      busnumber: localStorage.getItem('BusNum'),
      user: localStorage.getItem('username'),
      source: localStorage.getItem('source'),
      destination: localStorage.getItem('destination'),
      startTime: s,
      endTime: e,
      date: localStorage.getItem('busDate'),
      numOfSeats: localStorage.getItem('numOfSeats'),
      totalPrice: localStorage.getItem('totalPrice')
    };

    emailjs.send('gmail', 'template_zyqahd1', templateParams, 'user_LQUnilAw58Lv7SREimvSB')
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function (error) {
        console.log('FAILED...', error);
      });
  }

  useEffect(() => {
    const price = localStorage.getItem('busPrice');
    console.log("price: ", price)
    console.log("local2: ", localStorage.getItem('passengers'));
    const len = localStorage.getItem('numOfSeats');
    console.log("length: ", len)
    const t = price * len;
    //alert(t)
    localStorage.setItem('totalPrice', t);
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: t,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {

          saveBookedSeats();
          saveBooking();
          const passengers = JSON.parse(localStorage.getItem("passengers") || "[]");
          //alert(passengers);
          console.log("passengers length: ", passengers.length);
          passengers.map((passenger) => {
            console.log(passenger);
            console.log(passenger.passengerName);
            console.log(passenger.passengerGender);
            savePassengerDetails(passenger.passengerName, passenger.passengerGender, passenger.seatNo);
          });

          sendEmail();

          setPaidFor(true);
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          setError(err);
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  if (paidFor) {


    return (
      <div>

        <br /><br /><br /><br /><br /><br />

        <React.Fragment>
          <Paper className={classes.paper} elevation={6}>
            <div className={classes.container}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h6">
                      Awesome!
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Your booking has been confirmed! <br /><br />
           Check your email for details! <br />

                      <Link to="/aboutus/">Learn More</Link>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </Paper>
        </React.Fragment>
      </div>
    );
  }

  return (
    <div>

      <br /><br /><br /><br /><br /><br />
      {error && <div>Uh oh, an error occurred! {error.message}</div>}

      <div ref={paypal} />
    </div>
  );


}
