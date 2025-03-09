import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BlogCard from "../components/BlogCard"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Algorithms blog`
  const groups = data.allMarkdownRemark.group

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
  const cardWidth = (postsLength) => {
    if (postsLength === 3) {
      return "1/3"
    }
    return postsLength.length === 2 ? "1/2" : "full"
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
                {latestPosts.map(post => {
                  return <BlogCard key={post.fields.slug} post={post} wdth={cardWidth(latestPosts.length)}/>
                })}
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
            heroImage {
              childImageSharp {
                gatsbyImageData(width: 600, quality: 90, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`
