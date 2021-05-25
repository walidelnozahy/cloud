"use strict";

/*
  The @serverless/cloud package is included by default in the cloud runtime.
  So you don't have to include it in package.json.
  
  Use 'api' to build REST APIs, 'data' to access Serverless Data, and 'schedule'
  to create scheduled tasks.

  If you want to serve up static assets, just put them in the '/static' folder
*/
const { api, data, schedule } = require("@serverless/cloud"); // eslint-disable-line

/*
  This route creates/updates an item in Serverless Data using the supplied
  "key" and uses the post body to set the value. 
*/
api.post("/data/:key", async (req, res, next) => {
  const key = req.params.key;

  if (!key) {
    throw new Error('Missing "key" or "value" params.');
  }

  console.log(`Setting "${key}"`);

  // Just run the .set method to set an item to Serverless Data
  await data.set(key, req.body);

  res.send({ message: `Successfully set key "${key}"` });
});

/*
  This route fetches data from Serverless Data using the provided "key".
*/
api.get("/data/:key", async (req, res, next) => {
  const key = req.params.key;
  const reverse = req.query.reverse === "true" || false;

  if (!key) {
    throw new Error('Missing "key" param.');
  }

  console.log(`Getting "${key}"`);

  // Just run the .get method to get an item by its key
  const value = await data.get(key, { reverse });

  // Return the value if it exists
  res.send(value || {});
});

/*
  This route deletes data from Serverless Data using the provided "key".
*/
api.delete("/data/:key", async (req, res, next) => {
  const key = req.params.key;

  if (!key) {
    throw new Error('Missing "key" param.');
  }

  console.log(`Deleting "${key}"`);

  // Run the .remove() method to delete an item by key
  const result = await data.remove(key);
  console.log(`Deleted: ${result}`);

  // Return the value
  res.send({ deleted: result });
});

/*
  This is some custom error handler middleware
*/
// eslint-disable-next-line
api.use((err, req, res, next) => {
  // Errors are also streamed live to your terminal in dev mode.
  console.error(err.stack);

  if (!err.statusCode) {
    err.statusCode = 500;
  }

  const error = {
    name: err.name,
    statusCode: err.statusCode,
    message: err.message,
  };

  res.status(err.statusCode).json(error);
});

/*
  Sometimes you might want to run code on a schedule. 
*/
schedule.every("1 hour", () => {
  // This code block will run every hour!
  console.log("Hourly scheduled task triggered!");
});
