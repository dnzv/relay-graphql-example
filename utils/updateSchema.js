import fs from 'fs';
import Schema from '../data/schema';
import { env } from './params';
import {MongoClient} from 'mongodb';
import { graphql }  from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

(async () => {
  let db = await MongoClient.connect(env.mongoUrl);
  let result = await graphql(Schema(db), introspectionQuery);
  if (result.errors) {
    console.error('ERROR introspecting schema: ', result.errors);
  } else {
    fs.writeFile('./data/schema.json', JSON.stringify(result, null, 2), (err) => {
        if (err) throw err;
        console.log("schema.json created.");
      }
    );
  }
})();
