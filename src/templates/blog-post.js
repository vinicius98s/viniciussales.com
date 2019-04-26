import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

import Img from "gatsby-image"

import Layout from '../components/Layout'

export default ({ data }) => {
  const { markdownRemark: post } = data
  console.log(data)
  return (
    <Layout>
      <Helmet title={`Your Blog Name - ${post.frontmatter.title}`} />
      <div className="blog-post">
        <h1>{post.frontmatter.title}</h1>
        <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />
        <div
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        featuredImage {
            childImageSharp {
                fluid(maxWidth: 1250, maxHeight: 250) {
                    ...GatsbyImageSharpFluid
              }
            }
          }
      }
    }
  }
`