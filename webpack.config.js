var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/clappr-nerd-stats.js'),
  externals: {
    'clappr': 'Clappr',
    'clappr-stats': 'ClapprStats'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.html/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.html', '.css']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'clappr-nerd-stats.js',
    library: 'ClapprNerdStats',
    libraryTarget: 'umd'
  },
};