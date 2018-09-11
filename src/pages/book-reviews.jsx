import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Layout } from '../layouts';
import ReviewForm from '../components/review-form';
import Review from '../components/review';

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
            <>
              <hr />
              <Review title={edge.node.frontmatter.title} html={edge.node.html} />
            </>
          ))}
          <hr />
          <ReviewForm handleSave={review => console.log(review)} />
        </>
      )}
    />
  </Layout>
);

export default BookReviewsPage;
