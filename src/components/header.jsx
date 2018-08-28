import React from 'react';
import { Link } from 'gatsby';
import Routes from '../routes';

const Header = () => (
  <ul>
    <li>Blog</li>
    <li>
      <Link to={Routes.links}>Life changing links</Link>
    </li>
    <li>
      <Link to={Routes.about}>About</Link>
    </li>
  </ul>
);

export default Header;
