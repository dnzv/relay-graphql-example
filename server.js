import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';
import {MongoClient} from 'mongodb';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';

let app = express();
let port = process.env.PORT;
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

(async () => {
  let db = await MongoClient.connect(process.env.MONGO_URL);

  app.use('/graphql', GraphQLHTTP({
    schema: schema(db),
    graphiql: true
  }));

  app.listen(port, (err) => {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port)
  });
})();
