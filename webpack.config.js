'use strict';
module.exports = {
  entry: './public_html/script/index.js',
  output: {
    path: './public_html',
    filename: 'index.min.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules.*\.js/, loader: 'babel?plugins[]=transform-es2015-modules-commonjs' }, // scripts
      { test: /\.s(a|c)ss$/, exclude: /node_modules.*\.js/, loader: 'style!css!sass' }, // styles
      { test: /\.aag$/, loader: 'text' } // ascii art graphic
    ],
  },
  devtool: ['source-map']
};