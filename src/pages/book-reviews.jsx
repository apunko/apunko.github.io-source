import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Markdown from 'markdown-to-jsx';
import { Layout } from '../layouts';
import MarkDownEditor from '../components/markdown-editor';

const LinkContainer = () => (
  <Layout>
    <StaticQuery
      query={graphql`
        {
          allMarkdownRemark(
            filter: {fileAbsolutePath: {regex: "/.*/book-reviews/.*/"}}
          ) {
            edges {
              node {
                frontmatter {
                  title
                }
                html
              }
            }
          }
        }
      `}
      render={data => (
        <>
          <h1>Book reviews</h1>
          {data.allMarkdownRemark.edges.map(edge => (
            <>
              <h2 key={edge.node.frontmatter.title}>{edge.node.frontmatter.title}</h2>
              <Markdown>{edge.node.html}</Markdown>
            </>
          ))}
          <MarkDownEditor />
        </>
      )}
    />
  </Layout>
);

export default LinkContainer;
