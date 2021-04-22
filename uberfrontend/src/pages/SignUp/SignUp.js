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
  const [username, setUsername] = useState("User")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [dob, setDob] = useState('')
  const [contact, setContact] = useState('')
  const [error, setError]= useState('')
  const [helperuser, setHelperuser] = useState("");
  const [helperpassword, setHelperpassword] = useState("");
  const [helpercpassword, setHelpercpassword] = useState("");
  const [helperemail, setHelperemail] = useState("");
  const [helpercontact, setHelpercontact] = useState("");
  const [helperdob, setHelperdob] = useState("");
  // const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [errorusername, setErrorusername] = useState(false);
  const [errorpassword, setErrorpassword] = useState(false);
  const [erroremail, setErroremail] = useState(false);
  const [errorcontact, setErrorcontact] = useState(false);
  const [errordob, setErrordob] = useState(false);
  const [errorcpassword, setErrorcpassword] = useState(false);
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

  const handleUsername = (event) => {
    if (event.target.value == "") {
      setErrorusername(true);
      setHelperuser("Please enter Username");
    } else {
      setErrorusername(false);
      setHelperuser("");
    }
    setUsername(event.target.value);
  };

  const handleEmail = (event) => {
    if (event.target.value == "") {
      setErroremail(true);
      setHelperemail("Please enter Email");
    } else {
      setErroremail(false);
      setHelperemail("");
    }
    setEmail(event.target.value);
  };

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

  const handleDob = (event) => {
    if (event.target.value == "") {
      setErrordob(true);
      setHelperdob("Please enter Date of Birth");
    } else {
      setErrordob(false);
      setHelperdob("");
    }
    setDob(event.target.value);
  };

  const handleContact = (event) => {
    if (event.target.value == "") {
      setErrorcontact(true);
      setHelpercontact("Please enter Contact Number");
    } else {
      setErrorcontact(false);
      setHelpercontact("");
    }
    setContact(event.target.value);
  };
  
  function handleSubmit(event) {
    event.preventDefault();

    //username validation
    if (username == "User") {
      setErrorusername(true);
      setHelperuser("Please enter username");
      return;
    }

    //Email Validation
    var emailpattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!emailpattern.test(email)) {
      setErroremail(true);
      setHelperemail("Please enter valid email address");
      return;
    }
    //Password validation
    var passwordpattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);
    if (!passwordpattern.test(password)) {
      setErrorpassword(true);
      setHelperpassword("Password should contain Minimum eight characters, at least one letter, one number");
      return;
    }

    //confirm password validation
    var cpasswordpattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);
    if (!cpasswordpattern.test(cpassword)) {
      setErrorcpassword(true);
      setHelpercpassword("Password should contain Minimum eight characters, at least one letter, one number");
      return;
      
    }

    //validate confirm password
    if (password == cpassword) {
      setError(false);
      setErrorText(""); 
      return;
    } else {
      setError(true);
      alert("Passwords don't match");  
    }
    
    
    //validate dob
    var dobpattern= new RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i);
    if (!dobpattern.test(dob)) {
      setErrordob(true);
      setHelperdob("Date of birth should be in dd/mm/yyyy format");
      return;
    }

    //validate phone number
    var contactpattern= new RegExp (/^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/i);
    if (!contactpattern.test(contact)) {
      setErrorcontact(true);
      setHelpercontact("Please enter valid contact number in format (123)123-1234");
      return;
    }

  
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
              error={errorusername}
              onInput={handleUsername}
              value={username}
              // onInput={(e) => setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={'Username'}
              name="username"
              autoComplete="username"
              autoFocus
              helperText={helperuser}
            />
            <TextField
              value={email}
              error={erroremail}
              onInput={handleEmail}
              // onInput={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={'E-Mail'}
              name="email"
              autoComplete="email"
              autoFocus
              helperText={helperemail}
            />
            <TextField
              value={password}
              error={errorpassword}
              onInput={handlePassword}
              // onInput={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={'Password'}
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              helperText={helperpassword}
            />
            <TextField
              value={cpassword}
              error={errorcpassword}
              onInput={handleCPassword}
              //onInput={(e) => setCpassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password_confirm"
              label={'Confirm Password'}
              type="password"
              id="password_confirm"
              autoComplete="current-password"
              autoFocus
              helperText={helpercpassword}
            />
            <TextField
              value={dob}
              error={errordob}
              onInput={handleDob}
              //onInput={(e) => setDob(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="dob"
              label={'Date of Birth(DD/MM/YYYY)'}
              id="dob"
              autoComplete="DOB"
              autoFocus
              helperText={helperdob}
            />
            <TextField
              value={contact}
              error={errorcontact}
              onInput={handleContact}
              //onInput={(e) => setContact(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="contact"
              label={'Contact Number'}
              id="contact"
              autoComplete="contact"
              autoFocus
              helperText={helpercontact}
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
