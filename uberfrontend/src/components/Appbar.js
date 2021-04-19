import React from 'react';
import clsx from 'clsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Route, Link, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import './App.css';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';

import config from '../config/config'

// import your components:
import Home from "../pages/Home";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import PasswordReset from "../pages/PasswordReset/PasswordReset";
import PasswordChange from "../pages/PasswordChange/PasswordChange";
import THome from "../pages/Bookings/Home";
import Book from "../pages/Book/Book";
import NotFoundPage from "../pages/Book/NotFoundPage";
import RouteSelection from './RouteSelection/RouteSelection';///RouteSelection/RouteSelection';
import SeatSelection from './SeatSelection/SeatSelection';
import PayPal from './PaymentTab/PayPal';
import aboutus from '../pages/AboutUs';
import contactus from '../pages/ContactUs';
import profile from '../pages/Profile/index'

const drawerWidth = 240;
const history = createBrowserHistory();

// css
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  drawerPaperCollapsed: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center',
    fontStyle: 'italic',
  },
}));

//~dk
//const isAuthorised = config.auth.isAuthenticated()

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [collapsed, setCollapsed] = React.useState(false);
  const [title, setTitle] = React.useState('Home');

  const handleDrawerOpen = () => {
    setOpen(true);
    setCollapsed(false);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setCollapsed(false);
  };
  const handleDrawerCollapsed = () => {
    setCollapsed(true);
    setOpen(false);
  };
  const onItemClick = title => () => {
    setTitle(title);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* This is the header AppBar */}
      <AppBar style={{backgroundColor:'black'}} position="absolute" className={clsx(classes.appBar, 
          open && classes.appBarShift, collapsed && classes.appBar)}>
        <Toolbar title={title} className={classes.toolbar}>

          {/* The Menu icon exposes the left pane menu bar */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>

          {/* The title is set by the components */}
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {title}
          </Typography>

          {/* For kicks */}
          {/* <IconButton color="inherit">
            <Badge badgeContent={2} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
        </Toolbar>
      </AppBar>

      {/* The Router component routes URLs to your components */}
      <Router history={history} title={title} >

        {/* Drawers are left pane menu items in React-speak */}
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, 
              !open && classes.drawerPaperClose,
              collapsed && classes.drawerPaperCollapsed)
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>

            {/* This icon collapses the left pane enough to show menu item icons */}
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />

          {/* Left pane menu items */}
          <List>
            {/* Home menu item*/}
            <ListItem button component={Link} to="/" onClick={onItemClick('Home')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
              { title === 'Home' && 
                <ListItemIcon>
                  <IconButton onClick={handleDrawerCollapsed}>
                    <ChevronLeftIcon />
                  </IconButton>
                </ListItemIcon>
              }
            </ListItem>

            {/* About Us menu item*/}
            <ListItem button component={Link} to="/aboutus" onClick={onItemClick('AboutUs')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="AboutUs" />
              { title === 'AboutUs' && 
                <ListItemIcon>
                  <IconButton onClick={handleDrawerCollapsed}>
                    <ChevronLeftIcon />
                  </IconButton>
                </ListItemIcon>
              }
            </ListItem>

            {/* Bookings menu item*/}
            <ListItem button component={Link} to="/bookings" onClick={onItemClick('Bookings')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Bookings" />
              { title === 'Bookings' && 
                <ListItemIcon>
                  <IconButton onClick={handleDrawerCollapsed}>
                    <ChevronLeftIcon />
                  </IconButton>
                </ListItemIcon>
              }
            </ListItem>

            {/* Book menu item*/}
            <ListItem button component={Link} to="/Book" onClick={onItemClick('Book')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Book" />
              { title === 'Book' && 
                <ListItemIcon>
                  <IconButton onClick={handleDrawerCollapsed}>
                    <ChevronLeftIcon />
                  </IconButton>
                </ListItemIcon>
              }
            </ListItem>
            
             {/* SignUp menu item */}
             <ListItem button component={Link} to="/signin" onClick={onItemClick('Sign In')}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Sign In" />
              { title === 'Sign In' && 
                <ListItemIcon>
                  <IconButton onClick={handleDrawerCollapsed}>
                    <ChevronLeftIcon />
                  </IconButton>
                </ListItemIcon>
              }
            </ListItem>
            
            {/* ContactUs menu item */}
            <ListItem button component={Link} to="/contactus" onClick={onItemClick('ContactUs')}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="ContactUs" />
              { title === 'ContactUs' && 
                <ListItemIcon>
                  <IconButton onClick={handleDrawerCollapsed}>
                    <ChevronLeftIcon />
                  </IconButton>
                </ListItemIcon>
              }
            </ListItem>

            {/* User Profile menu item */}
          <ListItem button component={Link} to="/userprofile" onClick={onItemClick('User Profile')}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="User Profile" />
              { title === 'User Profile' && 
                <ListItemIcon>
                  <IconButton onClick={handleDrawerCollapsed}>
                    <ChevronLeftIcon />
                  </IconButton>
                </ListItemIcon>
              }
            </ListItem> 
  
          </List>
        </Drawer>

        {/* This is your mission control: Matches URLs above to your components */}
        <main className={classes.content}>

          {/* menu paths */}
          <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/bookings" exact component={THome} />
         {/*  <Route path="/Book" exact component={Book} /> */}
         {/* <Route path="/bookings" exact component={ListUserComponent} /> */}
          <Route path="/Book" exact render={props => <RouteSelection {...props} />} /> 
          <Route path="/seatSelection/" exact render={props => <SeatSelection {...props} />} />
          <Route path="/payment/" exact render={props => <PayPal {...props} />} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/password_reset" component={PasswordReset} />
          <Route path="/password_change" component={PasswordChange} />
          <Route path="/aboutus" component={aboutus} />
          <Route path="/contactus" component={contactus} /> 
          <Route path="/userprofile" component={profile} /> 
          <Route path="*" exact component={NotFoundPage} />
          </Switch>
        </main>
      </Router>
      
      {/* Whatever you put here will appear on all your pages, style appropriately! */}
    </div>
  );
}
