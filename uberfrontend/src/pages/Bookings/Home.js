
import React, { useState, useEffect } from "react";
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
//import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    width:350,
    // maxWidth: 500,
    paddingTop:40
  },
  media: {
    height: 140,
    paddingTop:300
  },
  card: {
    flexGrow: 1,
    padding: theme.spacing(2)
}
}));

const getCurrentDate=(separator='/')=>{

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const m=(month<10)?('0'+month):(''+month);
  const d=(date<10)?('0'+date):(''+date);
  const result=year+'-'+m+'-'+d;
  console.log("dateresult:",result);
  return result;
  }

const checkDisabled = (dateOfTravel) =>{
  console.log("dateOfTravel:",dateOfTravel)
  var d1 = Date.parse(dateOfTravel);
  var d22 = getCurrentDate('/');
  var d2 = Date.parse(d22);
  console.log("d1:",d1);
  console.log("d2:",d2);
  if (d1 <= d2) {
    console.log("checkDisabled:",1);
      return 1;
  }
  else{
    console.log("checkDisabled:",0);
    return 0;
  }
}


const THome = () => {
  const classes = useStyles();
  const [tweets, setTweets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [todayDate,setTodayDate] = React.useState('');

  const cancelBooking = (e,bookingid) =>{
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
    console.log("username:",localStorage.getItem('username'));
    const fetchData = async () => {
      //removed localhost
      fetch("/bookings-results", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
          'user': localStorage.getItem('username')//change this later
      })
    })  .then(res => res.json())
    .then(data =>{
      console.log(data);
      setTweets([...data]);
      //setTodayDate(getCurrentDate);
      setLoading(false);
     }) 
    
    };
    fetchData();
  }, []);

  return (
    // <ScrollView noSpacer={true} noScroll={true} style={styles.container}>
    //   {loading ? (
    //     <ActivityIndicator
    //       style={[styles.centering]}
    //       color="#ff8179"
    //       size="large"
    //     />
    //   ) : (
        // <TweetList tweets={tweets} />
       (localStorage.getItem('userid')===null ||localStorage.getItem('userid')===undefined)?(<div><br/><br/><br/><br/><br/><br/>
        Please login!</div>): 
       ( <div className={classes.card}>
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
              <CardMedia
                className={classes.media}
                image={
                  "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ieN2q3c75kbM/v0/1000x-1.jpg"
                }
                title="UBER BUS"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {link.user}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                  Source : {link.source}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                  Destination : {link.destination}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                  Date of Journey : {link.date}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                  Total Price : {link.totalPrice}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                  Number of seats booked: {link.numOfSeats}
                </Typography>
                <button disabled={checkDisabled(link.date)} onClick={(e,bookingid)=>cancelBooking(e,link._id)} >cancel</button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        </Grid>
    </div>
      
    //   )}
    // </ScrollView>
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


// import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
// import React, { Component,Field, TextField } from "react";
// import {makeStyles} from '@material-ui/core/styles';


// import {Typography, List, ListItem, ListItemText, Divider, Grid, Button} from "@material-ui/core";


// //import axios from 'axios';

// class THome extends Component {
  

//   constructor(props) {
//     super(props);
//     this.state = {
//       bookings: '', polarity: undefined, items: ''
//     };
//   }; 
  
//   componentDidMount() { 
//     fetch("http://localhost:5000/bookings-results")
//       .then(res => res.json())
//       .then(result => {
//           //alert(result);
//           console.log("result", result);
//           this.setState({bookings:<tbody>{ result.map((item, index) => (<tr><td key={index}>{item.user}</td><td key={index}>{item.source}</td>
//             <td key={index}>{item.destination}</td><td key={index}>{item.busnumber}</td><td key={index}>{item.date}</td>
//             <td key={index}>{item.startTime}</td><td key={index}>{item.endTime}</td><td key={index}>{item.bookeddate}</td></tr>))}  </tbody>})
//         },
//         // Note: it's important to handle errors here
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         (error) => {
//           console.log(error);
//         }
//       )
   
//    } 
   
// render(){
//   return (
	  
// 	  // <div>
//     //   <br></br><br></br>
//     //   <br></br><br></br>
//     //   <br></br><br></br>
    
//     // <table border='1'>
//     //         <thead>
//     //           <tr>
//     //             <th>User Name</th>
//     //             <th>Source</th>
//     //             <th>Destination</th>
//     //             <th>Bus Number</th>
//     //             <th>Date</th>
//     //             <th>Start Time</th>
//     //             <th>End Time</th>
//     //             <th>Booking Time</th>
//     //           </tr>
//     //         </thead>
//     // {this.state.bookings}
//     // </table>
//     // </div>
    
//   );
    
// }
// }

// export default THome;
