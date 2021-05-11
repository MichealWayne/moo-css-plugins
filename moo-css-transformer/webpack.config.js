/**
 * moo-css-transformer webpack config
 * @author MichealWayne
 * @date 2021.02.21
 */

const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const myBanner = `
${pkg.name}
@github ${pkg.repository.url}
`;

module.exports = {
  mode: 'production',
  entry: {
    c2m: path.join(__dirname, './src/c2m.js'),
    m2c: path.join(__dirname, './src/m2c.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: path.join(__dirname),
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            [
              '@babel/env',
              {
                loose: true,
              },
            ],
          ],
        },
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  plugins: [new webpack.BannerPlugin(myBanner)],
};
