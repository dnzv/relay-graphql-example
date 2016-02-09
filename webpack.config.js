const path = require('path');
const webpack = require('webpack');

process.env.MONGO_URL = process.env.MONGO_URL ||
                        "mongodb://rgrjs:1234@ds059115.mongolab.com:59115/rgrjsdb";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.BABEL_ENV = process.env.NODE_ENV;
process.env.PORT = process.env.PORT || 3000;

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
