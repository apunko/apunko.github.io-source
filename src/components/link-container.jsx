import React from 'react';
import MicrolinkCard from 'react-microlink';
import { StaticQuery, graphql } from 'gatsby';

const LinkContainer = () => (
  <StaticQuery
    query={graphql`
      {
        allArticlesJson {
          edges {
            node {
              id
              url
            }
          }
        }
      }
    `}
    render={data => (
      <>
        {data.allArticlesJson.edges.map(edge => (
          <MicrolinkCard key={edge.node.id} url={edge.node.url} />
        ))}
      </>
    )}
  />
);

export default LinkContainer;
