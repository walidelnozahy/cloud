---
title: Get Started
menuText: Get Started
firstChildMenuText: Quick Start
description: Here's the guide to get started with Serveless Cloud in seconds
menuOrder: 2
has_children: true
has_toc: false
---

# Quick Start

It literally takes seconds to have your first application running on Serverless Cloud. After signup to Serverless Cloud from [here](https://cloud.serverless.com/?view=register), you'll see two options to get started. 

- [Start with the CLI and template applications](#start-with-the-cli)
- [Fork one of the ready apps](#fork-an-app)

## Start with the CLI

If you want to start with our templates and build your own application from scratch, this option is for you. Note that you should have npm installed in order to run Cloud on your workspace. You can download it from [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). There are only two other steps required.


Create a new directory...

```
mkdir my-app && cd my-app
```

Initiate your first Cloud app 
```
npm init cloud <loginToken>
```

Select one of the app templates that lets you build with Javascript or Typescript integrated with React or Vue. Give a name to your app and start developing. 

Next, you'll be in Cloud Shell where you can visit the url, see live logs, make changes, and watch them quickly deploy to your own **personal instance**. Cloud Shell helps you write commands and go back in command history.Make code changes in your application and see how fast it's synced into a your application running on Cloud. 

## Fork an App

You can start by playing with the code of an existing app with this version. You can select one of the applications built by our team and our community and fork it to your Serverless Cloud sccount by following the below steps: 

Select one of the ready apps and fork it to your account: 

<img width="467" alt="ForkAnApp" src="https://user-images.githubusercontent.com/85096820/148572490-9dde98d0-660f-4b66-9c9d-604ba00ae6ef.png">


Note that some applications require you to assign values to their parameters and won't work properly until you pass this parameter. Serverless Cloud will prompt you to enter value for those parameters. You can enter immediately or leave it for later. 

After forking the app to your account, you need to clone it to your local environment and start working against **personal** instance on Cloud. 

The first step to install Serverless Cloud from npm.

```
npm i -g @serverless/cloud@latest
```

Clone the application to your local and start developing against Cloud: 

```
cloud clone @<userName>/<appName> --login <loginSlug>
```

The app is copied into a new directory named same as app, follow the instructions on CLI to start working on it. 

Note that this operation may fail with "npm install exited with code 1" error. In such cases, 

- Get into the directory named same as app by running `cd <appName>` 
- Run `npm i` to install dependencies yourself
- Type `cloud` to start working on your project. 

When you type `cloud`, you'll enter the interactive Cloud Shell where you can see your personal instance URL, and see the logs that the application prints. 
Make code changes in your application and see how fast it's synced into a your application running on Cloud. 


**Next:** [Serverless Cloud Concepts](/cloud/docs/get-started/concepts)
