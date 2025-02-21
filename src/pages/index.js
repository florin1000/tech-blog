import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Algorithms blog`
  const groups = data.allMarkdownRemark.group
  console.log(groups)

  if (groups.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <div>
        {groups.map(group => {
          const latestPosts = group.nodes.slice(0, 3)
          return (
            <section key={group.fieldValue}>
              <h3 className="">{group.fieldValue}</h3>
              <div className="mb-4 w-full border-b border-gray-300" />
              <div className="flex justify-between cards gap-3">
                {latestPosts.map(post => (
                  <div key={post.fields.slug} className="p-1 hover:border-b border-gray-300">
                    <h5>{post.frontmatter.title}</h5>
                    <p className="w-[90%]">{post.excerpt}</p>
                    <div>{post.frontmatter?.tags?.length > 0 && post.frontmatter.tags.split(",").map(tag => (
                      <span className="p-1 rounded bg-gray-300 mr-1 mb-1 text-sm" key={tag}>{tag}</span>))}</div>
                    <a href={post.fields.slug}>Read More</a>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      group(field: frontmatter___category) {
        fieldValue
        nodes {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            tags
          }
        }
      }
    }
  }
`

