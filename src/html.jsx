import React from 'react';

const HTML = ({
  htmlAttributes, bodyAttributes, headComponents, preBodyComponents, body, postBodyComponents,
}) => (
  <html {...htmlAttributes} lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {headComponents}
      <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js" />
    </head>
    <body {...bodyAttributes}>
      {preBodyComponents}
      <div
        key="body"
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: body }} // eslint-disable-line react/no-danger
      />
      {postBodyComponents}
    </body>
  </html>
);

export default HTML;
