import React from 'react';
import { AuthLayout } from '../layouts';
import HupCollection from '../components/hup-collection';
import AuthContext from '../contexts/auth-context';

const HupsPage = () => (
  <AuthLayout>
    <AuthContext.Consumer>
      {
        auth => (
          auth.user && <HupCollection />
        )
      }
    </AuthContext.Consumer>
  </AuthLayout>
);

export default HupsPage;
