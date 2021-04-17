import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import home from "../icons/home.jpeg"
//import '../styles/home.css';

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginTop: '200px'
  }
});


function Home(props) {
  const { classes } = props;
  const [checkout, setCheckOut] = useState(false);
  return (
      <div className={classes.root}>
        <h1 className="heading" color="black">Welcome to UberBus</h1>
        <img src={home} alt="home"/>
        </div>
  //       // <div className={classes.root}>    
  //       // <img src={home} />
  //       // <h2 className="heading">Welcome to UberBus</h2>  
  //       // </div>            
        
  //  // </div>
 
        
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
//export default Home;