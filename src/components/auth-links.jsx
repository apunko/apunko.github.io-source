import React from 'react';
import PropTypes from 'prop-types';

const AuthLinks = ({ auth }) => {
  if (!auth || !auth.user) {
    return <li><button type="button" onClick={auth.handleSignIn}>Sign in</button></li>;
  }

  return (
    <>
      <li>{auth.user.displayName}</li>
      <li><button type="button" onClick={auth.handleSignOut}>Sign out</button></li>
    </>
  );
};

AuthLinks.propTypes = {
  auth: PropTypes.shape({
    user: {},
    handleSignIn: PropTypes.func.isRequired,
    handleSignOut: PropTypes.func.isRequired,
  }),
};

export default AuthLinks;
