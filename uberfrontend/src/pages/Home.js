import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import PayPal from "../components/PaymentTab/PayPal";
import home from "../icons/home.jpeg"

const styles = theme => ({
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
        <h1>Welcome to UberBus</h1>
        <div>
        <img src={home} alt="home"/></div>
        </div>
        
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
