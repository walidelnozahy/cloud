---
title: Apps and Instances
menuText: Apps and Instances
description: Learn about Serverless Cloud's app and instance concepts.
menuOrder: 1
parent: Building Applications
---

# Apps and Instances

Serverless Cloud's isolation model lets developers rapidly iterate on code without needing to share resources or worry about collisions with others. Whether your a solo developer or a team collaborating with colleagues, Serverless Cloud reduces the development feedback loop and accelerates the path to production without sacrificing standard CI/CD and testing processes. 

## Apps

Serverless Cloud allows you to build **APPS** within your **ORGANIZATION**. Apps can be entire fullstack applications, independent microservices, isolated backends, or a frontend backed by a global CDN. You can create as many apps as you want.

## Instances

The actual code and resources for an **app** run in **instances**. Each **instance** contains its own set of isolated resources including separate copies of data and blob storage. The environments within **instances** are identical, so you can ensure that your application will behave exactly the same across all of them.

You can think of **instances** as "stages" or "environments" (e.g. prod, qa-test, dev), but Serverless Cloud's isolation model and rapid provisioning technology use instance "types" to enable incredibly powerful workflows. 

### Developer Sandboxes (Personal Instances)

Every developer on your team gets their own personal **Developer Sandbox** for every **APP** they work on. Each **Developer Sandbox** is your own "personal development workspace" that automatically syncs and deploys changes from your local environment as you code (typically in under a second). To enable interactive development mode, type `cloud` into the CLI within your project directory. This will spin up your own personal sandbox with isolated data and blob storage. Your developer sandbox gets its own public URL that you can use to test your application. The logs from your sandbox will stream instantly into your terminal, giving you immediate feedback on any changes you make.

### Stages (Permanent Instances)

When you're ready to show your work to the world, you can **deploy** your code to a **stage**. These are permanent, long-running instances like `prod`, `qa-test` and `dev`. If you want to publish your code to one of these instances, simply type `deploy my-stage-name` and your **CODE** will be published to `my-stage-name`.

### Previews (Ephemeral Instances)

If you want to get feedback on your application, but aren't ready to publish it to one of the permanent stages above, you can created **PREVIEWS** instead. Type `cloud share` into the CLI, and Serverless Cloud will create a **preview** that contains your **code AND data**. **Previews** are just like **stages**, except that previews will automatically expire when they are no longer being used.

### Test instances

When you run `cloud test`, Serverless Cloud spins up a new **Test Instance** to run your automated tests, then tears it down once they have finished. This lets you test your code without impacting other instances, and is used to run tests as part of your automated CI/CD process. 
