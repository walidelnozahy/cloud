---
layout: default
title: Using Typescript
nav_order: 5
parent: Building Applications
last_modified_date: 2021-07-20
---

# Using Typescript

Serverless Cloud supports both Javascript and [Typescript](https://www.typescriptlang.org/).

Enable Typescript by changing the entry point of your application to `index.ts`.

Add `tsconfig.json` to the root of your project, with this minimum configuration:

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

The `@serverless/cloud` library doesn't have type definitions yet, so you may want to add a `@ts-ignore` directive above the import statement to disable warnings.

```typescript
// index.ts

// @ts-ignore
import { api } from "@serverless/cloud";

api.get("/message", async (req: any, res: any) => {
  res.send({ message: "Hello Cloud!" });
});
```

You can write your tests in Typescript as well. To reference Jest globals in your tests, install the Jest types library:

```bash
npm i --save-dev @types/jest
```
