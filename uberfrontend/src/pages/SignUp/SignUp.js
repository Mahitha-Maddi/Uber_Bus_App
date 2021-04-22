import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { saveAuthorisation, isAuthorised } from '../../utils/auth'
//import { useIntl } from 'react-intl'
//import Page from 'material-ui-shell/lib/containers/Page/Page'
import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
//import Button from 'material-ui/Button'
import Paper from '@material-ui/core/Paper'
//import MenuContext from 'material-ui-shell/lib/providers/Menu/Context'
import emailjs from 'emailjs-com';

const useStyles = makeStyles((theme) => ({
  paper: {
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
  avatar: {
    margin: theme.spacing(1),
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `100%`,
  },
}))

const SignUp = () => {
  const classes = useStyles()
  //const intl = useIntl()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [dob, setDob] = useState('')
  const [contact, setContact] = useState('')
  //const { setAuthMenuOpen } = useContext(MenuContext)
  const postUser = async (username, password, email, contact, dob) => {
    console.log("email: ",email);
    const paramdict = {
      'username': username,
      'password': password,
      'email': email,
      'contact': contact,
      'dob': dob,
    }
    try {
      const config = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(paramdict)
      }
      const response = await fetch("http://localhost:5000/signup", config);
      //const response = await fetch(`${process.env.REACT_APP_BE_NETWORK}:${process.env.REACT_APP_BE_PORT}/tweet`, config);
      //const response = await fetch("/tweet", config);
      //const json = await response.json()
      if (response.ok) {
          //return json
          //return response
        var templateParams = {
            email_to: email
        };
         
        emailjs.send('gmail', 'template_kjha7q8', templateParams,'user_LQUnilAw58Lv7SREimvSB')
            .then(function(response) {
               console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
               console.log('FAILED...', error);
            });
            
          //alert("Congratulations! Successfully registered!");
          console.log("success on send.");
          
      } else {
          alert("response: " + response.toString());
      }

      try {
        const data = await response.json();
        console.log("on reply:")
        console.log(data);
        //alert(data);
        alert("Congratulations! Successfully registered! Please login to book rides!");
        // back to landing page!
        //history.push("/");
        history.push('/signin/');
        return (<Redirect to="/signin/" />)
      } catch (err) {
        console.log(err);
        alert("exception on reply!");
      }

    } catch (error) {
      console.log(error);
      alert("exception on send");
    }
  };


  function handleSubmit(event) {
    event.preventDefault()
    postUser(username, password, email, contact, dob);
  }

  return (
    // <Page
    //   pageTitle={intl.formatMessage({
    //     id: 'sign_up',
    //     defaultMessage: ' Sign up',
    //   })}
    //   onBackClick={() => {
    //     history.goBack()
    //   }}
    // >
    <React.Fragment>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
          <Typography component="h1" variant="h5">
            {'Sign up'}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              value={username}
              onInput={(e) => setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={'Username'}
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={'E-Mail'}
              name="email"
              autoComplete="email"
            />
            <TextField
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={'Password'}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              value={cpassword}
              onInput={(e) => setCpassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password_confirm"
              label={'Confirm Password'}
              type="password"
              id="password_confirm"
              autoComplete="current-password"
            />
            <TextField
              value={dob}
              onInput={(e) => setDob(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="dob"
              label={'Date of Birth(MM/DD/YYYY)'}
              id="dob"
              autoComplete="DOB"
            />
            <TextField
              value={contact}
              onInput={(e) => setContact(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="contact"
              label={'Contact Number'}
              id="contact"
              autoComplete="contact"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{backgroundColor:'black'}}
              className={classes.submit}
            >
              {'Sign up'}
            </Button>
          </form>
        </div>
      </Paper>
    </React.Fragment>
  )
}

export default SignUp
