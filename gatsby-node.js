/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// Define the templates
const blogPost = path.resolve(`./src/templates/blog-post.js`);
const categoryTemplate = path.resolve(`./src/templates/category.js`);

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Get all markdown blog posts sorted by date and grouped by category
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
          nodes {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              tags
            }
          }
        }
        nodes {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors);
    return;
  }

  // Create individual blog post pages
  const posts = result.data.allMarkdownRemark.nodes;
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  }

  // Create category pages
  const groups = result.data.allMarkdownRemark.group;
  if (groups && groups.length > 0) {
    groups.forEach(group => {
      createPage({
        path: `/category/${group.fieldValue.toLowerCase()}`,
        component: categoryTemplate,
        context: {
          category: group.fieldValue,
          totalCount: group.totalCount,
        },
      });
    });
  }
};

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the schema, including the category field in frontmatter
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      category: String
      tags: String
    }

    type Fields {
      slug: String
    }
  `);
};
