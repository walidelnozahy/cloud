---
title: Parameters
menuText: Parameters
description: Create and use parameters to store secrets for your Serverless Cloud application.
menuOrder: 6
parent: Building Applications
---

# Parameters

Serverless Cloud supports parameters, which can store secrets that your application needs to function.

## Setting parameters

Parameters are configured via the dashboard. Parameters are first specified per app, and then overriden per instance.

## Reading parameters

```js
const { api, params } = require("@serverless/cloud");

// your params are available at params.KEY
api.get("/", (req, res) => {
  console.log(params.KEY);
});
```
