// src/templates/category.js
import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

const CategoryPage = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.nodes;
  const { category } = pageContext;

  return (
    <Layout>
      <Seo title={`Category: ${category}`} />
      <h1>Category: {category}</h1>
      <ul>
        {posts.map(post => (
          <li key={post.fields.slug}>
            <Link to={post.fields.slug}>
              {post.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default CategoryPage;

export const query = graphql`
  query($category: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
        }
      }
    }
  }
`;
