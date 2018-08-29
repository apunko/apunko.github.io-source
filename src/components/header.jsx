import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Routes from '../routes';

const Header = ({ children }) => (
  <ul>
    <li>Blog</li>
    <li>
      <Link to={Routes.links}>Life changing links</Link>
    </li>
    <li>
      <Link to={Routes.about}>About</Link>
    </li>
    {children}
  </ul>
);

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: null,
};

export default Header;
