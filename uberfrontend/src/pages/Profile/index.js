import React, { Component } from 'react';
import EdiText from 'react-editext';

// import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

// import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
  // const dispatch = useDispatch();
  // const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    // dispatch(updateProfileRequest(data));
  }


  function onSave (val) {
    console.log('Edited Value -> ', val)
  }

  return (
    <Container>
      <Form  onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" /> 
      {/* Update the value field to the value from db. */}
        UserName:<input name="username" placeholder="Username" value="username" disabled = {true}/>
        Email:<input name="email" type="email" placeholder="Email address" value="email" disabled = {true}/>
        Date Of Birth:<input name="dob" type="date" placeholder="Birth Date" disabled = {true}/>
        Contact Number:<EdiText name="contact" type="number" value="617-818-1578" placeholder="Contact Number" />
        Password:<Input
          name="oldPassword"
          type="password"
          placeholder="Current password"
          disabled = {true}/>
        New Password<EdiText name="password" type="password" placeholder="New password" />
        Confirm Password:<EdiText
          name="confirmPassword"
          type="password"
          placeholder="Confirm new password"
        />

        <button type="submit">Update profile</button>
      </Form> 

    
    </Container>
  );
}

