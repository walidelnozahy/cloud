---
title: Using Typescript
menuText: Using Typescript
menuOrder: 7
parent: Building Applications
---

# Using Typescript

Serverless Cloud supports both Javascript and <a href="https://www.typescriptlang.org/" target="_blank" >Typescript</a>.

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

```typescript
// index.ts

import { api } from "@serverless/cloud";

api.get("/message", async (req: any, res: any) => {
  res.send({ message: "Hello Cloud!" });
});
```

You can write your tests in Typescript as well. To reference Jest globals in your tests, install the Jest types library:

```bash
npm i --save-dev @types/jest
```
