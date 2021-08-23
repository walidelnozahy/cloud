---
layout: default
title: Development Workflows
menuText: Development Workflows
menuOrder: 3
---

# Workflows to interate at the speed of Serverless

Serverless Cloud provides flexible workflows to make publishing and sharing your applications as easy as possible. Whether you're a single developer, or a team working on multiple projects, Serverless Cloud provides the tools you need for rapid iteration and feedback.

## Services

Serverless Cloud allows you to build **SERVICES** within your team's _ORGANIZATION_. You can create as many services as you want for different use cases or applications.

## Using Instances

Serverless Cloud provides every developer, stage, and preview build of a **SERVICE**, _isolated environments_ called **INSTANCES**. Each _instance_ is completely separate from all the other _instances_ in a _service_, and even store their own copy of the data. The environments within _instances_ are identical, so you can ensure that your application will behave exactly the same across all of them.

While _instance_ enviroments are identical, Serverless Cloud lets you classify instances to complement your workflow.

### Developer Instances

Every developer on your team gets a **Developer Instance** for every **SERVICE** they work on. Each _Developer Instances_ is your own "personal development workspace" that automatically syncs and deploys changes from your local IDE as you code. To enable this interactive development mode, type `cloud start` into the CLI within your project directory. You'll immediately have access to your own cloud environment, complete with your own data store and streaming logs to help you iterate quickly.

### Stages (Permanent Instances)

When you're ready to show your work to the world, you can _deploy_ your code to a **stage**. These are permanent instances like `prod`, `staging` and `dev`. If you want to publish your code to one of these instances, type `cloud deploy my-stage-name` into the CLI and your **CODE** will be published to `my-stage-name`.

### Previews (Ephemeral Instances)

If you want to get feedback on your application, but don't yet want to publish it to one of the permanent stages above, you can created **PREVIEWS** instead. Type `cloud share` into the CLI, and Serverless Cloud will create a _preview_ that contains your **code AND data**. _Previews_ are just like _stages_, except that previews will automatically expire when they are no longer being used.

## Forking Existing Instances

Another powerful feature of Serverless Cloud is its "forking" capabilities. _Developer Instances_ are just versatile working copies that can be used for developing, testing, debugging, and more. If you have an existing _git workflow_, you can load the current version of your code from your git repository. However, you can also **clone** an existing instance to give you a starting point. Type `cloud clone my-stage-name` into the CLI and it will copy both the **code AND data** from the `my-stage-name` instance into you _Developer Instance_ as well as update your local working directory. This allows you to quickly begin working with the current version of the code.

## Sample Workflows

Workflows are meant to be flexible, giving each unique team (or single developer) serverless superpowers.

### Single Developer with a sample project

```
# Initialize a sample project with interactive development mode on Cloud Shell
> cloud

# Edit your code locally and watch the changes automatically
# deploy into your own developer instance

# Deploy your code to "production"
> deploy production
```

### Single Developer editing/debugging an existing project

```
# Clone the "dev" stage
> cloud clone dev

# Enable interactive development mode
> cloud

# Edit your code locally and test the changes in
# your developer instance

# Deploy your code back to "dev"
> deploy dev
```

### Team collaborating on a project

```
# Enable interactive development mode
> cloud

# Edit code locally and test the changes in your
# developer instance

# Share your code and data with your team in a preview instance
> share feature-1

# Continue to work on your developer instance and make changes as feedback comes in.
# Share the changes with your team (to the same preview instance)
> share feature-1 --overwrite

# Once the team is happy with the changes, publish to "dev"
# for additional integration tests and feedback
> deploy dev
```

### Want to get started building apps on Serverless Cloud?

[Sign up for early access](https://www.serverless.com/cloud)
