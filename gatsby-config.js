module.exports = {
  siteMetadata: {
    title: 'Iago Dahlem Lorensini',
    description: "I'm a Front-end Developer working at Codeminer42.",
    author: 'Iago Dahlem Lorensini',
    email: 'iagodahlemlorensini@gmail.com',
    image:
      'https://res.cloudinary.com/iagodahlem/image/upload/c_scale,f_auto,q_auto,w_1600/v1524673942/iagodahlem.github.io/index.jpg',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/Layout.tsx'),
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Iago Dahlem Lorensini',
        short_name: 'I.',
        start_url: '/',
        background_color: '#11111a',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-84438304-1',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 740,
            },
          },
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data/comments`,
        name: 'comments',
      },
    },
  ],
}
