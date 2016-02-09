import fs from 'fs';
import path from 'path';
import { Schema } from '../data/schema';
import { graphql }  from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

console.log('Creating schema.json...\n');

(async () => {
  let json = await graphql(Schema, introspectionQuery);
  if (json.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(json.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../data/schema.json'),
      JSON.stringify(json, null, 2),
      (err) => {
        if (err) throw err;
        console.log("schema.json created.");
      }
    );
  }
})();
