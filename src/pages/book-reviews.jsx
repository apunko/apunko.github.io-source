import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Markdown from 'markdown-to-jsx';
import { Layout } from '../layouts';
import ReviewForm from '../components/review-form';

const BookReviewsPage = () => (
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
            <div key={edge.node.frontmatter.title}>
              <hr />
              <h2>{edge.node.frontmatter.title}</h2>
              <Markdown>{edge.node.html}</Markdown>
            </div>
          ))}
          <hr />
          <ReviewForm handleSave={review => console.log(review)} />
        </>
      )}
    />
  </Layout>
);

export default BookReviewsPage;
