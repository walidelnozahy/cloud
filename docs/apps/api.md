---
layout: default
title: APIs
nav_order: 1
parent: Building Applications
last_modified_date: 2021-05-30
---

# Creating API Routes
{: .no_toc }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

API routes in Serverless Cloud use a very similar syntax to Express.js. For more information regarding the Express.js syntax, visit [http://expressjs.com/en/4x/api.html](http://expressjs.com/en/4x/api.html). Some examples include:

```javascript
// Create a GET route for /users
api.get('/user', (req,res) => { ...do something... })

// Create a POST route for /users
api.post('/users', (req,res) => { ...do something... })

// Create a GET route for /users with a dynamic parameter
api.get('/users/:userId', (req,res) => { ...do something with req.params.userId... })
```