import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';

let app = express();
let router = express.Router();
let compiler = webpack(config);

app.use(express.static('public'));

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {colors: true},
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.listen(3000, console.log("http://localhost:3000/"));
