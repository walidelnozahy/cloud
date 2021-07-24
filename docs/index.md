---
layout: default
title: Home
nav_order: 1
---

<!-- prettier-ignore-start -->
# The way serverless was meant to be.
{: .fs-9 }
<!-- prettier-ignore-end -->

Serverless Cloud lets you build scalable, highly-secure, pay-per-use applications, without needing a deep knowledge of cloud services. Focus on writing code, instead of worrying about infrastructure.
{: .fs-6 .fw-300 }

![Serverless Cloud Beta](https://user-images.githubusercontent.com/2053544/125860147-6a1b7414-b59a-4369-b78f-36c3ffadb791.png)
{: .black-box }

[Get started now](#getting-started){: .btn .btn-primary .fs-5 .mb-2 .mb-md-0 .mr-2 }
[How it works](/cloud/learn.html){: .btn .btn-primary .fs-5 .mb-2 .mb-md-0 .mr-2 }
[Get early access](https://www.serverless.com/cloud){: .btn .btn-primary .fs-5 .mb-2 .mb-md-0 }

**PLEASE NOTE:** The Serverless Cloud is currently in **PRIVATE BETA**. If you'd like to sign up for the early access list, please visit [https://serverless.com/cloud](https://serverless.com/cloud).
{: .fs-5 .fw-400 }

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

Many parts of this are still experimental, so please keep that in mind when testing. Please log any issues and additional feedback can be sent to [cloud@serverless.com](mailto:cloud@serverless.com).
