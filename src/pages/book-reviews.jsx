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
                  author
                  link
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
          {data.allMarkdownRemark.edges.map((edge) => {
            const { html, frontmatter: { title, author, link } } = edge.node;

            return (
              <>
                <hr />
                <Review title={title} author={author} link={link} html={html} />
              </>
            );
          })}
          <hr />
          <ReviewForm handleSave={review => console.log(review)} />
        </>
      )}
    />
  </Layout>
);

export default BookReviewsPage;
