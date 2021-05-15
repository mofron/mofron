const webpack =　require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: __dirname + '/../js/docs.js',
  output: {
      path: __dirname + '/../dist/docs',
      filename: 'docs.js'
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
