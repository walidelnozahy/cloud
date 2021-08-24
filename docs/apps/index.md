---
layout: default
title: Building Applications
menuText: Building Applications
menuOrder: 4
has_children: true
has_toc: false
last_modified_date: 2021-05-30
---

# Building Applications on Serverless Cloud

Serverless Cloud uses a familar *Express.js-like* API for building cloud applications. Using the `@serverless/cloud` npm package gives you a simple interface to build `api`s, access `data`, pass `params` and `schedule` tasks.

## Importing the `@serverless/cloud` package

In order for your applications to run properly on Serverless Cloud, you need to require some helpers from the `@serverless/cloud` npm package. At the top of your `index.js` file, include the following:

```javascript
// CommonJS
const { api, data, schedule, params } = require("@serverless/cloud");

// ES Modules
import { api, data, schedule, params } from "@serverless/cloud";
```

You can then use the `api`, `data`, `schedule`, and `params` helpers to build your application.

### Learn more about:

[APIs](/cloud/apps/api)
[Serverless Data](/cloud/apps/data)
[Scheduled Tasks](/cloud/apps/schedule)
[Params](/cloud/apps/params)
[Using Typescript](/cloud/apps/typescript)
