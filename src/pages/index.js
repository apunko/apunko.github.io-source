import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import LinkContainer from '../components/link-container'

const IndexPage = () => (
  <Layout>
    <h1>Hi people, updates should come</h1>
    <LinkContainer />
    <Link to="/about/">About</Link>
  </Layout>
)

export default IndexPage
