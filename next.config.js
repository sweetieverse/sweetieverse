const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  cssModules: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  assetPrefix: '/assets',
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
        },
      ],
    });
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
      ],
    });
    return config;
  },
});
