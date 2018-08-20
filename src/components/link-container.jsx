import React from 'react'
import MicrolinkCard from 'react-microlink'

const { links } = require('../data/links.json');

class LinkContainer extends React.Component {
  render() {
    const microlinkCards = links.map(link => <MicrolinkCard key={link.id} url={link.url} />)
    
    return (
      <>
        {microlinkCards}
      </>
    )
  }
}

export default LinkContainer;
