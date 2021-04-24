import React, { Component, useState, useEffect } from "react";
import EdiText from "react-editext";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";


// import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from "@rocketseat/unform";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from "./styles";

export default function Profile() {
  // const dispatch = useDispatch();
  // const profile = useSelector(state => state.user.profile);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [helperuser, setHelperuser] = useState("");
  const [helpernewpassword, setHelpernewpassword] = useState("");
  const [helpercpassword, setHelpercpassword] = useState("");
  const [errornewpassword, setErrornewpassword] = useState(false);
  const [errorcpassword, setErrorcpassword] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [error, setError]= useState('')
  const [errorcontact, setErrorcontact] = useState(false);
  const [helpercontact, setHelpercontact] = useState("");

  const styleObj = {
    // fontSize: 40,

    paddingTop: "40px",
    paddingBottom: "40px",
    fontStyle: "italic",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    height: `100%`,
    backgroundColor: "#C0C0C0",
  };

  const buttonS = {
    backgroundColor: "black",
    paddingTop: "10px",
    width: "50%",
    justifyContent: "center",
    marginLeft: "25%",
  };

  useEffect(() => {
    const username = localStorage.getItem("username");

    const fetchData = async () => {
      fetch("http://localhost:5000/userDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: username }),
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log("our date:", data);
          console.log("contact: ", data[0].contact);
          setUsername(data[0].username);
          setEmail(data[0].email);
          setDob(data[0].dob);
          setContact(data[0].contact);
          setPassword(data[0].password);
        })
        .catch((error) => {
          console.log("Request failed", error);
          //alert(error);
        });
    };
    fetchData();
  }, []);

  const handlenewPasswordChange = (val) => {
    //setNpassword(val);
    if (val.target.value == "") {
      setErrornewpassword(true);
      setHelpernewpassword("Please enter Password");
    } else {
      setErrornewpassword(false);
      setHelpernewpassword("");
    }
    setNpassword(val.target.value);
  };

  const handleconfirmPasswordChange = (val) => {
    //setCpassword(val);
    if (val.target.value == "") {
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
    setCpassword(val.target.value);
  };
  /* 
const handleContactChange = e => {
  setContact({ contact: e.target.value })
} */
const handleSave = (val) => {
  if (val.target.value == "") {
    setErrorcontact(true);
    setHelpercontact("Please enter Contact Number");
  } else {
    setErrorcontact(false);
    setHelpercontact("");
  }
  setContact(val.target.value);
};

  // const handleSave = (val) => {
  //   setContact(val);
  //   console.log("contactval: ", val);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Password validation
    var passwordpattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);
    if (!passwordpattern.test(npassword)) {
      setErrornewpassword(true);
      setHelpernewpassword("Password should contain Minimum eight characters, at least one letter, one number, no special characters");
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
    if (npassword === cpassword) {
      setError(false);
      setErrorText(""); 
      
    } else {
      setError(true);
      //alert("Passwords don't match");  
      setErrorText("Passwords don't match"); 
      return;
    }

    //validate phone number
    var contactpattern= new RegExp (/^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/i);
    if (!contactpattern.test(contact)) {
      setErrorcontact(true);
      setHelpercontact("Please enter valid contact number in format (123)123-1234");
      return;
    }

    // const passwrd = cpassword === "" ? password : cpassword;
    fetch("http://localhost:5000/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: localStorage.getItem("username"),
        contact: contact,
        password: password,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("our date:", data);
        alert("Successfully updated!!");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Request failed", error);
        alert(error);
      });
  };

  const history = useHistory();

  const handleSignIn = () => {
    console.log("doing something");
    history.push("/signin");
  };
  const handleRegister = () => {
    console.log("doing something");
    history.push("/signup");
  };

  return localStorage.getItem("userid") === null ||
    localStorage.getItem("userid") === undefined ? (
    <div>
      <br />
      <br />
      <br />
      <br />

      <h3 style={styleObj}>**You have not logged in, Please Login!!!</h3>
      <Button
        variant="contained"
        margin="normal"
        color="primary"
        onClick={handleSignIn}
        style={buttonS}
      >
        {"Sign In"}
      </Button>
      <br></br>
      <br></br>
      <Button
        variant="contained"
        margin="normal"
        color="primary"
        onClick={handleRegister}
        style={buttonS}
      >
        {"Register"}
      </Button>
    </div>
  ) : (
    <Container>
      <form onSubmit={(e) => handleSubmit(e)}>
        <br></br>
        <br></br>
        <br></br>
        {/* Update the value field to the value from db. */}
        <TextField
          value={username}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label={"Username"}
          name="username"
          autoComplete="username"
          autoFocus
          disabled={true}
        />
        <TextField
          value={email}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label={"Email"}
          name="email"
          autoComplete="email"
          autoFocus
          disabled={true}
        />
        <TextField
          value={dob}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="dob"
          label={"Birth Date"}
          name="dob"
          autoComplete="dob"
          autoFocus
          disabled={true}
        />
        <EditIcon />
        <TextField
          value={contact}
          error={errorcontact}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="dob"
          label={"Contact Number"}
          name="contact"
          autoFocus
          onInput={handleSave}
          //onSave={handleSave}
          helperText={helpercontact}
        />
        <TextField
          value={password}

          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          id="password"
          label={"Password"}
          name="password"
          autoComplete="password"
          autoFocus
          disabled={true}
        />
        <EditIcon />
        <TextField
          value={npassword}
          error={errornewpassword}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          id="npassword"
          label={"New Password"}
          name="npassword"
         
          onInput={handlenewPasswordChange}
          //onSave={handlenewPasswordChange}
          helperText={helpernewpassword}
          autoFocus
        />
        <EditIcon />
        <TextField
          value={cpassword}
          error={errorcpassword}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          id="cpassword"
          label={"Confirmed Password"}
          name="cpassword"
          
          onInput={handleconfirmPasswordChange}
          //onSave={handleconfirmPasswordChange}
          helperText={helpercpassword + errorText}
          
          autoFocus
        />

        {/* UserName:<input name="username" placeholder="Username" value={username} disabled = {true}/>
        Email:<input name="email" type="email" placeholder="Email address" value={email} disabled = {true}/>
        Date Of Birth:<input name="dob"  placeholder="Birth Date" value={dob} disabled = {true}/> */}
        {/* Contact Number:<input name="contact"   onChange={(e) => {handleContactChange(e)}} /> */}
        {/* Contact Number<EdiText name="contact" variant="outlined"
              margin="normal"
              required
              fullWidth 
              autoFocus
              label={'Contact Number'}
              value={contact} onSave={handleSave} submitOnEnter placeholder="Contact Number"  />

        Password<input name="oldPassword" type="password" value={password} placeholder="Current password" disabled = {true}/> 

        New Password<EdiText name="password" type="password"  value={npassword} onSave={handlenewPasswordChange} submitOnEnter placeholder="New password" />
        Confirm Password<EdiText name="confirmPassword" type="password" value={cpassword} submitOnEnter onSave={handleconfirmPasswordChange} placeholder="Confirm new password"/> */}

        <button type="submit" style={{ backgroundColor: "black" }}>
          Update profile
        </button>
      </form>
      {/* <footer>
            <div className="Footer">
              <Footer />
            </div>
          </footer> */}
    </Container>
  );
}
