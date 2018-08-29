import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../components/auth';
import AuthContext from '../contexts/auth-context';
import AuthLinks from '../components/auth-links';
import Layout from './layout';

const AuthLayout = ({ children }) => (
  <Auth>
    <AuthContext.Consumer>
      {
        auth => (
          <Layout auth={<AuthLinks auth={auth} />}>
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
