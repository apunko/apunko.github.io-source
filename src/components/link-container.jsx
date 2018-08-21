import React from 'react';
import MicrolinkCard from 'react-microlink';

const { links } = require('../data/links.json');

const LinkContainer = () => (
  <React.Fragment>
    {links.map(link => <MicrolinkCard key={link.id} url={link.url} />)}
  </React.Fragment>
);

export default LinkContainer;
