/*eslint-env node */
const path = require('path');
const urljoin = require('url-join');
const webpack = require('webpack');

const APP_URL = process.env.APP_URL || 'http://localhost:5000';

module.exports = {
  entry: {
    main: './client/app.js',
    register: './client/register.js',
    login: './client/login.js',
    announcements: './client/announcements.js',
    createAnnouncement: './client/createAnnouncement.js',
    reports: './client/reports.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'wwwroot', 'js'),
  },
  resolve: {
    extensions: ['.js', '.scss'],
    modules: ['node_modules'],
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  externals: {
    'jquery': 'jQuery',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.DefinePlugin({
      GET_ALL_ANNOUNCEMENTS: JSON.stringify(urljoin(APP_URL, '/Announcement/GetAll')),
      REPORT_USER_ACTIONS: JSON.stringify(urljoin(APP_URL, '/Report/UserActions')),
    }),
  ],
};
