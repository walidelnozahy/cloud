---
layout: default
title: Building Applications
nav_order: 4
has_children: true
has_toc: false
last_modified_date: 2021-05-30
---

# Building Applications on Serverless Cloud

Serverless Cloud uses a familar *Express.js-like* API for building cloud applications. Using the `@serverless/cloud` npm package gives you a simple interface to build `api`s, access `data`, and `schedule` tasks. 

## Importing the `@serverless/cloud` package

In order for your applications to run properly on Serverless Cloud, you need to require some helpers from the `@serverless/cloud` npm package. At the top of your `index.js` file, include the following:

```javascript
// CommonJS
const { api, data, schedule } = require("@serverless/cloud");

// ES Modules
import { api, data, schedule } from "@serverless/cloud";
```

You can then use the `api`, `data`, and `schedule` helpers to build your application.

### Learn more about:

[APIs](/cloud/apps/api.html){: .btn .btn-primary .fs-5 .mt-4 .mb-md-0 .mr-2 }
[Serverless Data](/cloud/apps/data.html){: .btn .btn-primary .fs-5 .mt-4 .mb-md-0 .mr-2 }
[Scheduled Tasks](/cloud/apps/schedule.html){: .btn .btn-primary .fs-5 .mt-4 .mb-md-0 }