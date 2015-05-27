var ExtractTextPlugin = require('extract-text-webpack-plugin'),
path = require('path'),
webpack = require('webpack');

module.exports = {
  output: {
    path: './build',
    publicPath: '/public/',
    filename: '[name].js'
  },
  debug: false,
  devtool: false,
  entry: [
  './client.js',
  './client/styles/main.scss'
  ],
  stats: {
    colors: true,
    reasons: false
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      'styles': __dirname + '/client/styles',
      'components': __dirname + '/client/scripts/components',
      'actions': __dirname + '/client/scripts/actions',
      'stores': __dirname + '/client/scripts/stores',
      'constants': __dirname + '/client/scripts/constants',
      'mixins': __dirname + '/client/scripts/mixins',
      'configs': __dirname + '/client/scripts/configs',
      'utils': __dirname + '/client/scripts/utils'
    }
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, exclude: /node_modules/, loader: require.resolve('babel-loader') },
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader',
          'css!sass?outputStyle=expanded&' +
          "includePaths[]=" +
          (path.resolve(__dirname, "./node_modules"))
          )
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    }),
    new ExtractTextPlugin("[name].css", {allChunks: true}),
    new webpack.OldWatchingPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

};