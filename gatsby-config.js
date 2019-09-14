module.exports = {
  siteMetadata: {
    title: `Vinicius Sales`,
    description: `A portfolio and personal blog from a Front-End developer made with Gatsby and React.`,
    author: `@vinicius98s`,
    siteUrl: 'https://vinicius98s.github.io',
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-transition-link`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Montserrat:400,500,700'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: `${__dirname}/src`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Vinicius Sales Blog`,
        short_name: `Vinicius`,
        start_url: `/`,
        background_color: `#D93047`,
        theme_color: `#D93047`,
        display: `minimal-ui`,
        icon: `src/assets/images/Logo.svg`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
};
