import React from 'react';
import Layout from '../components/layout';
import Hup from '../components/hup';
import HupForm from '../components/hup/hupForm';

const HupsPage = () => (
  <Layout>
    <h2>Hups</h2>
    <Hup />
    <HupForm />
  </Layout>
);

export default HupsPage;
