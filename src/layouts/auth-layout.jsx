import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../components/auth';
import Layout from './layout';

const AuthLayout = ({ children }) => (
  <Auth>
    <Layout>
      {children}
    </Layout>
  </Auth>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
