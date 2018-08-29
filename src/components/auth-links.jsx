import React from 'react';
import PropTypes from 'prop-types';

const AuthLinks = ({ auth }) => {
  console.log(auth);
  if (!auth || !auth.user) {
    return <button type="button" onClick={auth.handleSignIn}>Sign in</button>;
  }

  return (
    <>
      {auth.user.displayName}
      <button type="button" onClick={auth.handleSignOut}>Sign out</button>
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
