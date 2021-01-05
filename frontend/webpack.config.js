// var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
 
var config = {
  entry: './main.js',

  output: {
    filename: 'index.js'
  },

  devServer: {
    inline: true,
    port: 5000,
    historyApiFallback: true
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },{
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000' 
    }
    ]
  }
  // ,
  // plugins: [
  //   new CaseSensitivePathsPlugin()
  // ]
};

module.exports = config;
