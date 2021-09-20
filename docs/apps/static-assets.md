---
title: Static Websites & Assets
menuText: Static Websites & Assets
menuOrder: 5
parent: Building Applications
---

# Static Websites & Assets

Serverless Cloud allows you to serve files from your application URL. This is useful for serving static assets such as images, CSS, and JavaScript, allowing you to host front-end apps and websites. By convention, static assets must be stored in the `static` directory at the root of your application.

API routes take precedence over static assets and will be served first.

## Using React, Vue, and other SPAs

If you are using SPAs that require a *build* step, you can store your source files in your project directory and configure your output directory to be `/static`. To prevent Serverless Cloud from syncing your source files, you can add a **`.serverlessignore`** file in the root of your project and add a list of directories and files you do not wish to sync.

For example, if your source files are stored in `/src`, your **`.serverlessignore`** file should contain the following:

```
src
```

This will allow you to run a separate terminal with your SPA build scripts running and only sync when it generates output files.
