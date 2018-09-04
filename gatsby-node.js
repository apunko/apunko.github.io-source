exports.onCreateNode = ({ node }) => {
  if (node.internal.type === 'MarkdownRemark') {
    console.log('+++++++++++++++++++++++++++++++++++++++++++');
    console.log(node.internal.type);
  }
};
