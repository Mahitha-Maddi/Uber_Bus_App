import { useHistory } from 'react-router-dom'
import { saveAuthorisation, isAuthorised } from '../../utils/auth'
import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
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
    marginTop: theme.spacing(10),
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

const PasswordChange = () => {
  const classes = useStyles()
  const history = useHistory()
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [errorcpassword, setErrorcpassword] = useState(false);
  const [errorpassword, setErrorpassword] = useState(false);
  const [helperpassword, setHelperpassword] = useState("");
  const [helpercpassword, setHelpercpassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [error, setError]= useState('')
  // const { setAuthMenuOpen } = useContext(MenuContext)

  const handlePassword = (event) => {
    if (event.target.value == "") {
      setErrorpassword(true);
      setHelperpassword("Please enter Password");
    } else {
      setErrorpassword(false);
      setHelperpassword("");
    }
    setPassword(event.target.value);
  };

  const handleCPassword = (event) => {
    if (event.target.value == "") {
      setErrorcpassword(true);
      setHelpercpassword("Please enter Confirmed Password");
     } else {
    //   if (event.handlePassword !== event.handleCPassword) {
    //     setError(true);
    //      setErrorText("Password and Confirm Password is not matching")
    //   }
    //  else{
        setErrorcpassword(false);
      setHelpercpassword("");
      }
      
    //}
    setCpassword(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    
    //Password validation
    var passwordpattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);
    if (!passwordpattern.test(password)) {
      setErrorpassword(true);
      setHelperpassword("Password should contain Minimum eight characters, at least one letter, one number, no special characters");
      return;
    }

    //confirm password validation
    var cpasswordpattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);
    if (!cpasswordpattern.test(cpassword)) {
      setErrorcpassword(true);
      setHelpercpassword("Password should contain Minimum eight characters, at least one letter, one number, no special characters");
      return;
      
    }

    //validate confirm password
    if (password === cpassword) {
      setError(false);
      setErrorText(""); 
      
    } else {
      setError(true);
      //alert("Passwords don't match");  
      setErrorText("Passwords don't match"); 
      return;
    }

    if(token==='1234'){
    const paramdict = {
      'email': localStorage.getItem('passSetEmail'),
      'password': password
    }
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramdict)
    }
    fetch("http://localhost:5000/updateUserForgotPassword", config)
      .then(res => res.json())
      .then(data => {
        alert("Successfully updated! you can now login!");
        history.replace('/signin');
      }).catch(error => {
        // this.setState({ availableBuses: "This is an error page!!" })
        console.log('Request failed', error)
        
    alert("Please try again!")
    window.location.reload();
    });
  }
  else{
    alert("Invalid token! Please try again!");
    window.location.reload();
  }

  }

  function resendToken(event){
    event.preventDefault();
    var templateParams = {
      email_to: localStorage.getItem('passSetEmail')
  };
   
  emailjs.send('gmail', 'template_bar4hnx', templateParams,'user_84Ail5Gec6Hu3umTTuGdc')
      .then(function(response) {
        alert("A token has been sent to your email!");
         console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
         console.log('FAILED...', error);
      });
    
      alert("A token has been sent to your email!");
      window.location.reload();
  }
  return (
    <React.Fragment>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
          <Typography component="h1" variant="h5">
            {'Password change'}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
              value={token}
              onInput={(e) => setToken(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="token"
              label={'Enter token'}
              name="token"
              autoComplete="token"
              autoFocus
            />
            <TextField
              type="password"
              value={password}
              error={errorpassword}
              onInput={handlePassword}
              //onInput={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label={'New password'}
              name="password"
              autoComplete="password"
              autoFocus
              helperText={helperpassword}
            />
            <TextField
              type="password"
              value={cpassword}
              error={errorcpassword}
              onInput={handleCPassword}
              //onInput={(e) => setCpassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cpassword"
              label={'Confirm password'}
              name="cpassword"
              autoComplete="cpassword"
              autoFocus
              helperText={helpercpassword + errorText}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{backgroundColor:'black'}}
              className={classes.submit}
            >
              {'Reset Password'}
            </Button>
          </form>
          <form className={classes.form} onSubmit={resendToken}>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{backgroundColor:'black'}}
              className={classes.submit}
            >
              {'Resend token'}
          </Button>
          </form>
        </div>
      </Paper>
    </React.Fragment>
  )
}

export default PasswordChange
