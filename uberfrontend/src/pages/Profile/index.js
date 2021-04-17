import React, { Component, useState, useEffect } from 'react';
import EdiText from 'react-editext';

// import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

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
    alert(username);
    fetch('http://localhost:5000/userDetails', {
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

      
  }

)

   
const handlenewPasswordChange = e => {
  setNpassword({ npassword: e.target.value })
}

const handleconfirmPasswordChange = e => {
  setCpassword({ cpassword: e.target.value })
}
/* 
const handleContactChange = e => {
  setContact({ contact: e.target.value })
} */

const handleSave = (val) => {
  setContact(val)

}

const handleSubmit = e => {
  e.preventDefault()

  fetch('http://localhost:5000/updateUser', {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({user:localStorage.getItem('username'), contact:contact , password:(cpassword==='')?password:cpassword
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
        UserName:<input name="username" placeholder="Username" value={username} disabled = {true}/>
        Email:<input name="email" type="email" placeholder="Email address" value={email} disabled = {true}/>
        Date Of Birth:<input name="dob"  placeholder="Birth Date" value={dob} disabled = {true}/>
        {/* Contact Number:<input name="contact"   onChange={(e) => {handleContactChange(e)}} /> */}
       Contact Number:<EdiText name="contact"  onSave={handleSave} submitOnEnter placeholder="Contact Number"  /> 
        Password:<input name="oldPassword" type="password" value={password} placeholder="Current password" disabled = {true}/>
        {/* New Password<EdiText name="password" type="password" placeholder="New password" value={npassword} onChange={(e) => {handlenewPasswordChange(e)}} />
        Confirm Password:<EdiText name="confirmPassword" type="password" placeholder="Confirm new password" value={cpassword} onChange={(e) => {handleconfirmPasswordChange(e)}}/>
 */}
        <button type="submit">Update profile</button>
      </form> 

    
    </Container>
  ))
}

