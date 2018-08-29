import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../components/auth';
import AuthContext from '../contexts/auth-context';
import Layout from './layout';

const AuthLayout = ({ children }) => (
  <Auth>
    <AuthContext.Consumer>
      {
        auth => (
          <Layout
            auth={
              <>
                <button type="button" onClick={auth.handleSignIn}>Sign in</button>
                <button type="button" onClick={auth.handleSignOut}>Sign out</button>
              </>
            }
          >
            {children}
          </Layout>
        )
      }
    </AuthContext.Consumer>
  </Auth>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
