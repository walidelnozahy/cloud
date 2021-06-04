---
layout: default
title: Home
nav_order: 1
---

# The way serverless was meant to be.
{: .fs-9 }
Serverless Cloud lets you build scalable, highly-secure, pay-per-use applications, without needing a deep knowledge of cloud services. Focus on writing code, instead of worrying about infrastructure.
{: .fs-6 .fw-300 }


![serverless cloud beta](https://user-images.githubusercontent.com/2053544/120826323-4dd37700-c528-11eb-810d-1b9f7ef24f5d.png)
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

Initialize a sample project

```
cloud init
```

Start developing...

```
cloud start
```

Visit the url, see live logs, make changes, and watch them quickly deploy to your own **personal development instance**. 

When ready, you can publish to `prod`:

```
cloud deploy prod
```

This will publish to a completely seperate instance. You may continue developing using `cloud start` without affecting `prod`, but anytime you want to copy the entire `prod` instance (including data) into your own personal development instance, just run:

```
cloud clone prod
```

And starting developing on the code and data copied from `prod`:

```
cloud start
```

## Feedback

Many parts of this are still experimental, so please keep that in mind when testing. Please log any issues and additional feedback can be sent to [cloud@serverless.com](mailto:cloud@serverless.com).
