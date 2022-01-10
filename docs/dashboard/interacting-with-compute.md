---
title: Interacting with Compute Resources
menuText: Interacting with Compute Resources
description: Learn how you can test your endpoints on Serverless Cloud
menuOrder: 3
parent: Serverless Cloud Dashboard
---

# Interacting with Compute Resources of Instances 

Developers can create endpoints on Serverless Cloud that respond to any HTTP actions like `GET`, `POST`, `DELETE`, and `PUT` as explained [here](https://www.serverless.com/cloud/docs/apps/api). Serverless Cloud provides a built-in interact functionality that lets you call the endpoints on the instances. It's available both for personal instances and stages.

Note that the Interact feature is now in beta and should be used accordingly. 

Let's look at some Interact usage examples. In the first example, we'll make a `GET` request to the `/generate` endpoint of [Serverless Meme Generator](https://cloud.serverless.com/calganaygun/meme-generator-serverless). As it can be seen below, the URL parameters are provided and the response body and headers are presented as a result. 

![Screen Shot 2022-01-08 at 12 41 13 AM](https://user-images.githubusercontent.com/85096820/148612414-83f72367-3e8a-4c09-bc34-d15c5b49904a.png)

Second example might be making a `POST` request to the `/register` endpoint of the [chat](https://cloud.serverless.com/serverless/chat) app which is built by Serverless Cloud team as an example app. As it can be seen below, you register a new user on the chat app by calling the endpoint from the Interact menu. 

![Screen Shot 2022-01-08 at 12 29 51 AM](https://user-images.githubusercontent.com/85096820/148613052-94a0350d-cdd4-4606-8ef1-efa5b4f39665.png)
