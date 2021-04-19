import React, { useState, Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import home from "../icons/home.jpeg"

import uber1 from "../styles/images/uber1.jpeg";
import uber2 from "../styles/images/uber2.jpeg";
import uber3 from "../styles/images/uber3.jpeg";
import uber4 from "../styles/images/uber4.jpeg";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
//import '../styles/home.css';



import "../styles/home.css";

const styles = (theme) => ({
  root: {
     display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginTop: '100px'
  }

});

function Home(props) {
  const { classes } = props;
  const [checkout, setCheckOut] = useState(false);
  return (

      <div className={classes.root}>
       
      <div class='container-fluid'>

            <Carousel fade>
                <div>
                <img className="d-block w-100" src={uber1} alt="First slide" />
              <h3>Adding a Joy to your Journey</h3>
                </div>
                <div>
                <img className="d-block w-100" src={uber2} alt="Second slide" />
                <h3>Lets you Explore the Best</h3>
                </div>
                <div>
                    <img className="d-block w-100" src={uber3} alt="Fourth slide"/>
                    <h3>Bringing Joy From Every journey</h3>
                </div>
                <div>
                    <img className="d-block w-100" src={uber4} alt="Fourth slide"/>
                    <h3>Quality Travelling, Quality Service</h3>
                </div>

            </Carousel>
            
      
        </div>
        </div>


  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
//export default Home;
