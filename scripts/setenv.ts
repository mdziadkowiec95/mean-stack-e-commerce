const { writeFile } = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs

const environment = argv.environment;
const isProduction = environment === 'prod';

if (!process.env) {
   console.error('All the required environment variables were not provided!');
   process.exit(-1);
}

const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
    export const environment = {
        production: ${isProduction},
        MONGO_USER: "${process.env.MONGO_USER}",
        MONGO_PASSWORD: "${process.env.MONGO_PASSWORD}",
        MONGO_DBNAME: "${process.env.MONGO_DBNAME}",
        CF_SPACE_ID: "${process.env.CF_SPACE_ID}",
        CF_DELIVERY_ACCESS_TOKEN: "${process.env.CF_DELIVERY_ACCESS_TOKEN}",
    };
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${targetPath}`);
});
