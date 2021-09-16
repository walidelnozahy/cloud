---
title: Cloning Instances
menuText: Cloning Instances
menuOrder: 4
parent: Worklows
---

## Forking Existing Instances

Another powerful feature of Serverless Cloud is its "forking" capabilities. _Developer Instances_ are just versatile working copies that can be used for developing, testing, debugging, and more. If you have an existing _git workflow_, you can load the current version of your code from your git repository. However, you can also **clone** an existing instance to give you a starting point. Type `cloud clone my-stage-name` into the CLI and it will copy both the **code AND data** from the `my-stage-name` instance into you _Developer Instance_ as well as update your local working directory. This allows you to quickly begin working with the current version of the code.