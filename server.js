import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';
import {MongoClient} from 'mongodb';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';

let app = express();

let compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {colors: true},
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.use(express.static('public'));

let db;

// export MONGO_URL=mongodb://rgrjs:1234@ds059115.mongolab.com:59115/rgrjsdb
MongoClient.connect(process.env.MONGO_URL, (err, database) => {
  if (err) throw err;

  db = database;

  app.use('/graphql', GraphQLHTTP({
    schema: schema(db),
    graphiql: true
  }));

  app.listen(3000, console.log("==> http://localhost:3000/"));
});
