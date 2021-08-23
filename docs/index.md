---
layout: default
title: Overview
menuText: Overview
menuOrder: 1
---

# The way serverless was meant to be.

Serverless Cloud lets you build scalable, highly-secure, pay-per-use applications, without needing a deep knowledge of cloud services. Focus on writing code, instead of worrying about infrastructure.

![Serverless Cloud Beta](https://user-images.githubusercontent.com/2053544/125860147-6a1b7414-b59a-4369-b78f-36c3ffadb791.png)

[Get started now](#getting-started)
[How it works](/cloud/learn.html)
[Get early access](https://www.serverless.com/cloud)

**PLEASE NOTE:** We're accepting users selectively for Serverless Cloud at this stage. If you'd like to sign up for the early access list, please visit [https://serverless.com/cloud](https://serverless.com/cloud).

## Getting Started

Install globally from npm...

```
npm i -g @serverless/cloud@latest
```

Create a new directory...

```
mkdir my-cloud && cd my-cloud
```

Initialize a sample project and start developing

```
cloud
```

Visit the url, see live logs, make changes, and watch them quickly deploy to your own **personal development instance**. Cloud Shell helps you write commands and go back in command history.

When ready, you can publish to `prod` from Cloud Shell:

```
deploy prod
```

This will publish to a completely seperate instance. You may continue developing using `cloud start` without affecting `prod`, but anytime you want to copy the entire `prod` instance (including data) into your own personal development instance, just run:

```
clone [service_name]/prod
```

And continue developing on the code and data copied from `prod`:

Visit Serverless Cloud Dashboard to see your services and instances, to define secrets and apply it to your instances and to check the logs and metrics of your instances via [cloud.serverless.com](https://cloud.serverless.com)

## Feedback

Please log any issues and additional feedback can be sent to [cloud@serverless.com](mailto:cloud@serverless.com).
