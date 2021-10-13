/*
  The @serverless/cloud package is included by default in the cloud runtime.
  So you don't have to include it in package.json.
  
  Use 'api' to build REST APIs, 'data' to access Serverless Data, and 'schedule'
  to create scheduled tasks.

  If you want to serve up static assets, just put them in the '/static' folder
*/
import { api, data, schedule, params } from "@serverless/cloud";

// Create GET route and return users
api.get("/users", async (req, res) => {
  // Get users from Serverless Data
  let result = await data.get("users:*", true);
  // Return the results
  res.send({
    users: result.items,
  });
});
