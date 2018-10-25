const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions


  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode, basePath: 'pages' })

    createNodeField({
      name: 'slug',
      node,
      value,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const BlogPostTemplate = path.resolve('./src/templates/BlogPostTemplate.js')

  return new Promise((resolve, reject) => {
    graphql(`{
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }`)
    .then(({ data, errors }) => {
      if (errors) {
        return reject(errors)
      }

      data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: BlogPostTemplate,
          context: {
            slug: node.fields.slug
          },
        })
      })

      resolve()
    })
  })
}
