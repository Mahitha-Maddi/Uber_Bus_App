import React, { useState, Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import { CardActionArea } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import home from "../icons/home.jpeg";

import uber1 from "../styles/images/uber1.jpeg";
import uber5 from "../styles/images/uber5.jpeg";
import uber3 from "../styles/images/uber3.jpeg";
import uber4 from "../styles/images/uber4.jpeg";
import uber2 from "../styles/images/uber2.jpeg";
import card1 from "../styles/images/card1.jpeg";
import uber6 from "../styles/images/uber6.jpeg";
import SF from "../styles/images/card2.jpeg";
import Charleston from "../styles/images/Charleston.jpeg";
import Chicago from "../styles/images/chicago.jpeg";
import newOrleans from "../styles/images/new-orleans-hero.jpeg";
import savanna from "../styles/images/savannah-georgia-SAVANNAH0519.jpeg"
import Footer from "./Footer";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
//import '../styles/home.css';

import "../styles/home.css";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginTop: "100px",
  },
  
});

function Home(props) {
  const { classes } = props;
  const [checkout, setCheckOut] = useState(false);
  
  return (
    <div className={classes.root}>
      <div class="container-fluid">
        <Carousel fade>
          <div>
            <img className="d-block w-100" src={uber1} alt="First slide" />
            <h4>Adding a Joy to your Journey</h4>
          </div>
          <div>
            <img className="d-block w-100" src={uber6} alt="Second slide" />
            <h3>Lets you Explore the Best</h3>
          </div>
          <div>
            <img className="d-block w-100" src={uber3} alt="Fourth slide" />
            <h3>Bringing Joy From Every journey</h3>
          </div>
          <div>
            <img className="d-block w-100" src={uber4} alt="Fourth slide" />
            <h3>Quality Travelling, Quality Service</h3>
          </div>
        </Carousel>
        <CardDeck>
          <Card >
          <CardActionArea href="https://www.planetware.com/tourist-attractions-/new-york-city-us-ny-nyc.htm">
          <CardContent>
            <Card.Img variant="top" src={card1} width='100px' height='160px' />
            <Card.Body>
              <Card.Title>New York</Card.Title>
              <Card.Text>
              New York is a city made up of five boroughs: 
              Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. 
              Most tourist attractions are in Manhattan, 
              with a few scattered across Brooklyn, Queens, and the Bronx. 
              
              </Card.Text>
              <Typography>Know More!</Typography>
            </Card.Body>

            </CardContent>
            </CardActionArea>
          </Card>
          <Card >
          <CardActionArea href="https://www.charlestoncvb.com/">
          <CardContent>
            <Card.Img variant="top" src={Charleston} width='100px' height='160px' />
            <Card.Body>
              <Card.Title>Charleston</Card.Title>
              <Card.Text>
              Charleston, the South Carolina port city founded in 1670, 
              is defined by its cobblestone streets, horse-drawn carriages and pastel antebellum houses, 
              particularly in the elegant French Quarter and Battery districts.  
              
              </Card.Text>
              <Typography>Know More!</Typography>
            </Card.Body>

            </CardContent>
            </CardActionArea>
          </Card>
          <Card >
          <CardActionArea href="https://www.travelandleisure.com/travel-guide/san-francisco">
          <CardContent>
            <Card.Img variant="top" src={SF} width='100px' height='160px' />
            <Card.Body>
              <Card.Title>San Francisco</Card.Title>
              <Card.Text>
              San Francisco is home to Golden Gate Park, 
              which is the third most visited park in the U.S. 
              and spans 1,017 acres. 
              </Card.Text>
              <Typography>Know More!</Typography>
            </Card.Body>

            </CardContent>
            </CardActionArea>
          </Card>
        </CardDeck>
        <hr></hr>
        <CardDeck>
          <Card >
          <CardActionArea href="https://www.choosechicago.com/">
          <CardContent>
            <Card.Img variant="top" src={Chicago} width='100px' height='160px' />
            <Card.Body>
              <Card.Title>Chicago</Card.Title>
              <Card.Text>
              Chicago, on Lake Michigan in Illinois, is among the largest cities in the U.S. 
              Famed for its bold architecture, it has a skyline punctuated by 
              skyscrapers such as the iconic John Hancock Center, 
              1,451-ft. Willis Tower (formerly the Sears Tower) and the neo-Gothic Tribune Tower. 
              
              </Card.Text>
              <Typography>Know More!</Typography>
            </Card.Body>

            </CardContent>
            </CardActionArea>
          </Card>
          <Card >
          <CardActionArea href="https://www.visitsavannah.com/list/15-cant-miss-things-to-do-savannah">
          <CardContent>
            <Card.Img variant="top" src={savanna} width='100px' height='160px' />
            <Card.Body>
              <Card.Title>Savanna</Card.Title>
              <Card.Text>
              A savanna or savannah is a mixed woodland-grassland ecosystem characterised 
              by the trees being sufficiently widely spaced so that the canopy does not close. 
              The open canopy allows sufficient light to reach the ground to support an unbroken herbaceous 
              layer consisting primarily of grasses 
              
              </Card.Text>
              <Typography>Know More!</Typography>
            </Card.Body>
 
            </CardContent>
            </CardActionArea>
          </Card>
          <Card >
          <CardActionArea href="https://www.neworleans.com/">
          <CardContent>
            <Card.Img variant="top" src={newOrleans} width='100px' height='160px' />
            <Card.Body>
              <Card.Title>New Orleans</Card.Title>
              <Card.Text>
              New Orleans is a Louisiana city on the Mississippi River, 
              near the Gulf of Mexico. Nicknamed the "Big Easy," it's known for its round-the-clock nightlife, 
              vibrant live-music scene and spicy, singular cuisine reflecting its history as a melting pot of French, 
              African and American cultures.  
              </Card.Text>
              <Typography>Know More!</Typography>
            </Card.Body>
    
            </CardContent>
            </CardActionArea>
          </Card>
        </CardDeck>
        <footer>
        <div className="Footer">
          <Footer />
        </div>
      </footer>
      </div>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
//export default Home;
