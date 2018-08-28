import React from 'react';
import AuthLayout from '../layouts/auth-layout';
import Hup from '../components/hup';
import HupForm from '../components/hup/hupForm';

const HupsPage = () => (
  <AuthLayout>
    <h2>Hups</h2>
    <Hup />
    <HupForm />
  </AuthLayout>
);

export default HupsPage;
