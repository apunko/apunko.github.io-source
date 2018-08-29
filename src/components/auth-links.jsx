import React from 'react';
import PropTypes from 'prop-types';

const AuthLinks = ({ auth }) => {
  console.log(auth);
  if (!auth || !auth.user) {
    return <button type="button" onClick={auth.handleSignIn}>Sign in</button>;
  }

  return (<>
    <button type="button" onClick={auth.handleSignOut}>Sign out</button>
  </>);
};

AuthLinks.propTypes = {
  auth: PropTypes.isRequired,
};

export default AuthLinks;
