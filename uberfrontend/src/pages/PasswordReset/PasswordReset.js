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
    marginTop: theme.spacing(10),
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

const PasswordReset = () => {
  const classes = useStyles()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [erroremail, setErroremail] = useState(false);
  const [helperemail, setHelperemail] = useState("");

  // const { setAuthMenuOpen } = useContext(MenuContext)

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

  function handleSubmit(event) {
    event.preventDefault();

    //Email Validation
    var emailpattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!emailpattern.test(email)) {
      setErroremail(true);
      setHelperemail("Please enter valid email address");
      return;
    }

    localStorage.setItem('passSetEmail', email);
    const paramdict = {
      'email': email
    }
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramdict)
    }
    fetch("/checkUserWithEmail", config)
      .then(res => res.json())
      .then(data => {
        //alert("Saved passenger! " + data);
        console.log(data);
        if (data === 401) {
          alert("Email is not registered! Please sign up!");
          history.replace('/signup');

        }
        else {
          var templateParams = {
            email_to: email
          };

          emailjs.send('gmail', 'template_bar4hnx', templateParams, 'user_84Ail5Gec6Hu3umTTuGdc')
            .then(function (response) {
              alert("A token has been sent to your email!");
              console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
              console.log('FAILED...', error);
            });

          alert("A token has been sent to your email!");
          history.replace('/password_change');
        }
      })
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
          <Typography component="h1" variant="h5">
            {'Password reset'}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              value={email}
              error={erroremail}
              onInput={handleEmail}
              //onInput={(e) => setEmail(e.target.value)}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ backgroundColor: 'black' }}
              className={classes.submit}
            >
              {'Reset Password'}
            </Button>
            <>
              <Button fullWidth
                variant="contained"
                color="primary"
                style={{ backgroundColor: 'black' }} onClick={() => history.goBack()}>Back</Button>
            </>
          </form>
        </div>
      </Paper>
    </React.Fragment>
  )
}

export default PasswordReset
