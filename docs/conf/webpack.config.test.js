const webpack =　require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: __dirname + '/../js/test.js',
  output: {
      path: __dirname + '/../dist/test',
      filename: 'dist_test.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: __dirname + '../../node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin()
  ],
  //target: "node"
};
