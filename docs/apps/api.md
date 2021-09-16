---
title: APIs
menuText: APIs
menuOrder: 2
parent: Building Applications
---

# Creating API Routes

API routes in Serverless Cloud use Express.js syntax and methods. For more information regarding Express.js, visit [http://expressjs.com/en/4x/api.html](http://expressjs.com/en/4x/api.html).

## Creating an API

To create an API with Serverless Cloud, you define routes in your code using the `api` helper imported from the `@serverless/cloud` module.

```javascript
// CommonJS
const { api } = require("@serverless/cloud");

// ES Modules
import { api } from "@serverless/cloud";
```

You can then use a supported method to define an API route.

```javascript
// Create a GET route for /users
api.get('/user', (req,res) => { ...do something... })

// Create a POST route for /users
api.post('/users', (req,res) => { ...do something... })
```

## Supported methods

Currently, all Express.js [Application](http://expressjs.com/en/4x/api.html#app) methods are supported. The following is a list of common API methods in Serverless Cloud.

Methods accept a `path` and `callback` parameter.

| Method     | Description                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `all()`    | This method is like the standard app.METHOD() methods, except it matches all HTTP verbs.                                                                           |
| `delete()` | Routes HTTP DELETE requests to the specified path with the specified callback functions.                                                                           |
| `get()`    | Routes HTTP GET requests to the specified path with the specified callback functions.                                                                              |
| `post()`   | Routes HTTP POST requests to the specified path with the specified callback functions.                                                                             |
| `put()`    | Routes HTTP PUT requests to the specified path with the specified callback functions.                                                                              |
| `use()`    | Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path. |

## Specifying paths

Though Express.js supports multiple formats, we suggest using simple string representions for your paths. Dynamic parameters can be set using the `:paramName` syntax. This value will be available in your callback function via the `req.params` object.

```javascript
// Create a GET route for /users with a dynamic parameter
api.get('/users/:userId', (req,res) => { ...do something with req.params.userId... })
```

## Callback functions

API route methods accept one or more callback functions as the second parameter. Callback functions receive a **Request** and **Response** object, as well as a `next` method as parameters.

### Request object

The Request object currently supports the same properties and methods as the Express.js [Request](http://expressjs.com/en/4x/api.html#req) object. By convention, the Request object is referenced as `req`.

The most used `req` properties are as follows:

| Properties    | Description                                                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `req.body`    | The parsed body of the request. If the `Content-Type` is `application/json`, the value will automatically be parsed into an object. |
| `req.cookies` | An object that contains any passed cookis.                                                                                          |
| `req.method`  | The HTTP VERB used to trigger this route.                                                                                           |
| `req.params`  | An object that contains parsed parameters from the url as defined using `:paramName`.                                               |
| `req.path`    | The path used in the request.                                                                                                       |
| `req.query`   | An object containing parsed querystring parameters.                                                                                 |

### Response object

The Response object currently supports the same methods as the Express.js [Response](http://expressjs.com/en/4x/api.html#res) object. By convention, the Response object is referenced as `res`.

The most used `res` methods are as follows:

| Method           | Description                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `res.cookie()`   | Sets cookie name to value. See [res.cookie()](http://expressjs.com/en/4x/api.html#res.cookie).                                                                                             |
| `res.json()`     | Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using `JSON.stringify()`.                             |
| `res.location()` | Sets the response `Location` HTTP header to the specified path parameter.                                                                                                                  |
| `res.redirect()` | Redirects to the URL derived from the specified path, with specified status, a positive integer that corresponds to an HTTP status code. If not specified, status defaults to “302 Found”. |
| `res.send()`     | Sends the HTTP response. The body parameter can be a `Buffer` object, a `String`, an `object`, `Boolean`, or an `Array`.                                                                   |

## Middleware

Serverless Cloud supports both *Application* and *Route-level* middleware. For more information on middleware, please visit the [Express.js docs](http://expressjs.com/en/guide/using-middleware.html).
