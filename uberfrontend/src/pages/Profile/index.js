import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

// import { updateProfileRequest } from '~/store/modules/user/actions';
//  import { logout } from '../SignIn/SignIn.js';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
  // const dispatch = useDispatch();
  // const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    // dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    // dispatch(logout());
  }

  return (
    <Container>
      <Form  onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" /> 

        <Input name="username" placeholder="Username" />
        <Input name="email" type="email" placeholder="Email address" />
        <Input name="dob" type="date" placeholder="Birth Date" />
        <hr />
        <Input
          name="oldPassword"
          type="password"
          placeholder="Current password"
        />
        <Input name="password" type="password" placeholder="New password" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm new password"
        />

        <button type="submit">Update profile</button>
      </Form> 

      <button type="button" onClick={handleSignOut}>
        Sign out
      </button>
    </Container>
  );
}

