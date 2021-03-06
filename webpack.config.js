const path = require('path');
const webpack = require('webpack');
var env = require('./utils/params').env;

process.env.MONGO_URL = env.mongoUrl;
process.env.NODE_ENV = env.mode;
process.env.BABEL_ENV = env.mode;
process.env.PORT = env.port;

const PATHS = {
  src: path.join(__dirname, 'src'),
  public: path.join(__dirname, 'public')
};

module.exports = {
  debug: true,
  devtool: '#eval-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    PATHS.src
  ],
  output: {
      path: PATHS.public,
      publicPath: '/assets/scripts/',
      filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: PATHS.src,
        loaders: ['babel?cacheDirectory']
      },
      {
        test: /\.css$/,
        include: PATHS.src,
        loaders: ['style', 'css?sourceMap']
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  target: 'web'
};
