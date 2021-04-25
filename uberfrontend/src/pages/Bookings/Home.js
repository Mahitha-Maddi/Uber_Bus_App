
import React, { useState, useEffect, Component } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
// import TweetList from "./TweetList";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Link } from "@material-ui/core/";
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Footer from "../Footer";
//import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    width: 350,
    // maxWidth: 500,
    paddingTop: 40
  },
  media: {
    height: 140,
    paddingTop: 300
  },
  card: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  input: {
    "&:disabled": {
      color: "black"
    }
  }
}));

/* const styleObj = {
  // fontSize: 40,

  textAlign: "center",
  paddingTop: "10px",
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: `100%`,
}
 */


const getCurrentDate = (separator = '/') => {

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const m = (month < 10) ? ('0' + month) : ('' + month);
  const d = (date < 10) ? ('0' + date) : ('' + date);
  const result = year + '-' + m + '-' + d;
  console.log("dateresult:", result);
  return result;
}

const checkDisabled = (dateOfTravel) => {
  console.log("dateOfTravel:", dateOfTravel)
  var d1 = Date.parse(dateOfTravel);
  var d22 = getCurrentDate('/');
  var d2 = Date.parse(d22);
  console.log("d1:", d1);
  console.log("d2:", d2);
  if (d1 <= d2) {
    console.log("checkDisabled:", 1);
    return 1;
  }
  else {
    console.log("checkDisabled:", 0);
    return 0;
  }
}


const THome = () => {
  const classes = useStyles();
  const [tweets, setTweets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [todayDate, setTodayDate] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const styleObj = {
    // fontSize: 40,


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

  const cancelBooking = (e, bookingid) => {
    e.preventDefault();
    const paramdict = {
      'bookingid': bookingid
    }
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramdict)
    }
    fetch("/cancelBooking", config)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        //alert("Booking canceled successfully!!")
        window.location.reload();
      })
  }

  useEffect(() => {
    console.log("username:", localStorage.getItem('username'));
    const fetchData = async () => {
      //removed localhost
      fetch("/bookings-results", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'user': localStorage.getItem('username')//change this later
        })
      }).then(res => res.json())
        .then(data => {
          console.log(data);
          setTweets([...data]);
          //setTodayDate(getCurrentDate);
          setLoading(false);
        })

    };
    fetchData();
  }, []);
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
      (<div className={classes.card}>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {
            tweets.map((link) => (
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        U
          </Avatar>
                    }
                    title={link.date}
                    subheader={link.source + ">>>>>>" + link.destination}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h6">

                      <TextField
                        className={classes.input}
                        value={link.busnumber}
                        margin="normal"
                        fullWidth
                        id="filled-basic"
                        variant="filled"
                        label={'Bus Number'}
                        name="Bus Number"
                        autoComplete="Bus Number"
                        autoFocus
                        disabled
                      />
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h6">

                      <TextField
                        className={classes.input}
                        value={link.startTime.split(' ')[1]}
                        margin="normal"
                        fullWidth
                        id="filled-basic"
                        variant="filled"
                        label={'Start Time'}
                        name="Start Time"
                        autoComplete="Start Time"
                        autoFocus
                        disabled
                      />
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h6">
                      <TextField
                        value={link.endTime.split(' ')[1]}
                        margin="normal"
                        fullWidth
                        id="filled-basic"
                        variant="filled"
                        label={'End Time'}
                        name="End Time"
                        autoComplete="End Time"
                        autoFocus
                        disabled={true}
                      />
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h6">
                      <TextField
                        value={link.totalPrice}
                        margin="normal"
                        fullWidth
                        id="filled-basic"
                        variant="filled"
                        label={'Total Price'}
                        name="Total Price"
                        autoComplete="Total Price"
                        autoFocus
                        disabled={true}
                      />
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h6">
                      <TextField
                        value={link.numOfSeats}
                        margin="normal"
                        fullWidth
                        id="filled-basic"
                        variant="filled"
                        label={'Seats Booked'}
                        name="Seats Booked"
                        autoComplete="Seats Booked"
                        autoFocus
                        disabled={true}
                      />
                    </Typography>
                    <CardActions disableSpacing>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        {link.passengers.map((passenger) =>
                        (<div>
                          <TextField
                            value={passenger.passengerName}
                            margin="normal"
                            fullWidth
                            id="filled-basic"
                            variant="outlined"
                            label={'Seats Booked'}
                            name="Seats Booked"
                            autoComplete="Seats Booked"
                            autoFocus
                            disabled={true}
                          />
                          <TextField
                            value={passenger.passengerGender}
                            margin="normal"
                            fullWidth
                            id="filled-basic"
                            variant="outlined"
                            label={'Seats Booked'}
                            name="Seats Booked"
                            autoComplete="Seats Booked"
                            autoFocus
                            disabled={true}
                          />

                          <TextField
                            value={passenger.seatNo}
                            margin="normal"
                            fullWidth
                            id="filled-basic"
                            variant="outlined"
                            label={'Seats Booked'}
                            name="Seats Booked"
                            autoComplete="Seats Booked"
                            autoFocus
                            disabled={true}
                          />
                        </div>
                        ))
                        }
                      </CardContent>
                    </Collapse>
                    <button className="btn btn-dark btn-md" disabled={checkDisabled(link.date)} onClick={(e, bookingid) => cancelBooking(e, link._id)} >Cancel Ride</button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>

      ))
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    marginTop: "60px",
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    height: "100vh",
  },
});

export default THome;


