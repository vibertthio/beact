var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

loaders.push({
	test: /\.jsx?$/,
	exclude: /(node_modules|bower_components|public\/)/,
	loader: "babel-loader"
});

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: '[chunkhash].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
		alias: {
			animations: path.resolve(__dirname, 'src/utils/animations'),
			config: path.resolve(__dirname, 'src/utils/config'),
			yuen: path.resolve(__dirname, 'src/assets/images/animations/yuen'),
			vapor: path.resolve(__dirname, 'src/assets/images/animations/vapor'),
			naruto: path.resolve(__dirname, 'src/assets/images/animations/naruto'),
			images: path.resolve(__dirname, 'src/assets/images'),
		},
  },
  module: {
    loaders
  },
  plugins: [
		new LodashModuleReplacementPlugin,
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'Beact',
      template: './src/template.html',
      files: {
        css: ['style.css'],
        js: ['bundle.js'],
      },
      filename: 'index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/audio', to: 'assets/audio' },
      { from: 'src/assets/images/logo.png' },
      { from: 'src/assets/images/ico/flash.ico' },
			{ from: 'src/assets/images/animations/yuen/bg.jpg' },
    ]),
  ]
};
