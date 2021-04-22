import React, { Component, useState, useEffect } from 'react';
import EdiText from 'react-editext';

// import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import TextField from '@material-ui/core/TextField';

// import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
  // const dispatch = useDispatch();
  // const profile = useSelector(state => state.user.profile);
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')
  const [npassword, setNpassword] = useState('')
  const [cpassword, setCpassword] = useState('')

  useEffect(() => {
    const username=localStorage.getItem('username');
    const fetchData = async () => {
      fetch('/userDetails', {
        method: 'POST', headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify({user:username })
      })
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(data => {
          console.log("our date:",data)
          console.log("contact: ",data[0].contact)
          setUsername(data[0].username)
          setEmail(data[0].email)
          setDob(data[0].dob)
          setContact(data[0].contact)
          setPassword(data[0].password)
          })
        .catch(error => {
          console.log('Request failed', error)
          alert(error);
        });
  
    
    };
    fetchData();
  }, []
  );

   
const handlenewPasswordChange = (val) => {
  setNpassword(val)
}

const handleconfirmPasswordChange = (val) => {
  setCpassword(val)
}
/* 
const handleContactChange = e => {
  setContact({ contact: e.target.value })
} */

const handleSave = (val) => {
  setContact(val)
  console.log("contactval: ",val);

}

const handleSubmit = e => {
  e.preventDefault()
  const passwrd =(cpassword==='')?password:cpassword;
  fetch('/updateUser', {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({user:localStorage.getItem('username'), contact:contact , password:passwrd
  })})
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log("our date:",data)
      alert("Successfully updated!!")
      window.location.reload();
      })
    .catch(error => {
      console.log('Request failed', error)
      alert(error);
    });
  
}


  return (
    (localStorage.getItem('userid')===null ||localStorage.getItem('userid')===undefined)?(<div>
      <br/><br/><br/><br/><br/><br/>Please login!</div>):
      (
    <Container>
      <form  onSubmit={e => handleSubmit(e)}>
        <AvatarInput name="avatar_id" /> 
      {/* Update the value field to the value from db. */}
      <TextField
              value={username}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={'Username'}
              name="username"
              autoComplete="username"
              autoFocus
              disabled = {true}
            />
          <TextField
              value={email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={'Email'}
              name="email"
              autoComplete="email"
              autoFocus
              disabled = {true}
            />
            <TextField
              value={dob}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="dob"
              label={'Birth Date'}
              name="dob"
              autoComplete="dob"
              autoFocus
              disabled = {true}
            />
            
        {/* UserName:<input name="username" placeholder="Username" value={username} disabled = {true}/>
        Email:<input name="email" type="email" placeholder="Email address" value={email} disabled = {true}/>
        Date Of Birth:<input name="dob"  placeholder="Birth Date" value={dob} disabled = {true}/> */}
        {/* Contact Number:<input name="contact"   onChange={(e) => {handleContactChange(e)}} /> */}
       Contact Number:<EdiText name="contact" variant="outlined"
              margin="normal"
              required
              fullWidth 
              autoFocus
              label={'Contact Number'}
              value={contact} onSave={handleSave} submitOnEnter placeholder="Contact Number"  />

        Password:<input name="oldPassword" type="password" value={password} placeholder="Current password" disabled = {true}/> 

        New Password<EdiText name="password" type="password"  value={npassword} onSave={handlenewPasswordChange} submitOnEnter placeholder="New password" />
        Confirm Password:<EdiText name="confirmPassword" type="password" value={cpassword} submitOnEnter onSave={handleconfirmPasswordChange} placeholder="Confirm new password"/>

        <button type="submit"  style={{backgroundColor:'black'}} >Update profile</button>
      </form> 

    
    </Container>
  ))
}

