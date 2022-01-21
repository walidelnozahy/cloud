---
title: Developer Sandboxes (Personal Instances)
menuText: Developer Sandboxes
description: Learn about Developer Sandboxes and how to use them.
menuOrder: 1
parent: Worklows
---

# Developer Sandboxes

Developer sandboxes are the place that you start working on your Cloud application. When you type `cloud` from your terminal, Serverless Cloud CLI connects to your developer sandbox of the app associated with that folder. If the folder is empty and doesn't include a project, you'll be prompted to select an app or start a new app from one of our templates.

Developer sandboxes are your own personal workspaces that let you interate on and test code without worrying about affecting production workloads or interfering with other developers.

### Why Developer Sandboxes Matter

One of the biggest problems with cloud development is the productivity lost while trying to replicate, emulate, or mock cloud resources locally. Without local emulation, the feedback loop generally consists of "develop -> deploy -> test -> see error", all of which can take a painfully long time. With Serverless Cloud, it's possible to develop in Cloud while still using your local development tools. The changes you make locally are automatically synced and deployed to your developer sandbox instantly (typically less than a second depending on the size of the change). This gives you a rapid development feedback loop that will ensure your code will behave in production as it behaves in your developer sandbox.
