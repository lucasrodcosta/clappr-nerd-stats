const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/clappr-nerd-stats.js'),
  mode: 'production',
  externals: {
    'clappr': 'Clappr',
    'clappr-stats': 'ClapprStats'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.html/, use: 'html-loader' }
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
  }
};
