---
layout: default
title: Automated Testing
nav_order: 4
last_modified_date: 2021-07-08
---

# Automated Testing
{: .no_toc }

Serverless Cloud has built-in support for automated unit and integration testing.

Simply create your test files and run the `cloud test` command from the command line, or enter `test` in the Cloud shell.

Your tests are run in your personal instance, using the [Jest testing framework](https://jestjs.io/){:target="_blank"}.

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## Writing tests

Serverless Cloud uses [Jest](https://jestjs.io/){:target="_blank"} under the hood and you have access to all its features like matchers, mock functions, and setup/teardown.

As an example let's create a test for the to-do sample application. This is the code we'd like to test:

```js
// from index.js

/* 
 * Create a route to GET our TODO items
*/
api.get('/todos', async (req, res) => {

  // Call our getTodos function with the status
  let result = await getTodos(req.query.status, req.query.meta ? true : {});

  // Return the results
  res.send({
    items: result.items
  })
})
```

Test test for this handler will do a few things. First, it will set up some test data to retrieve. Then it will simulate the GET request using the built-in `invoke()` method and check the response. Finally it will clean up the test data.

Create a file called `api.test.js` in the `tests` folder. Use `beforeAll` and `afterAll` blocks to set up the test data and delete it after the test has finished:

```js
// api.test.js

beforeAll(async () => {
  await data.set(
    "todo:123456",
    {
      id: "123456",
      name: "Something to do",
    }
  );
});

afterAll(async () => {
  await data.remove("todo:123456");
});
```

Now we're ready to write our test which goes in a `test` block.

Using the built-in `invoke()` helper we can invoke our API handler and check the result.

```js
test("should get all todos", async () => {
  const { body } = await api.get("/todos?status=all").invoke();

  expect(body).toEqual({
    items: [
      {
        id: "123456",
        name: "Something to do",
      },
    ],
  });
});
```

And that's it! You can use the same techniques to add more test cases, such as changing the `status=all` query string parameter, and testing other methods like `POST` and `DELETE`.

Check out Jest's [Getting Started Guide](https://jestjs.io/docs/getting-started){:target="_blank"} to learn more about writing tests with the Jest framework.

[Our to-do example application](https://github.com/serverless/cloud/tree/main/examples/default) also includes tests that you can use as a starting point.

## Running tests

To run your tests start the Cloud shell, type `test` at the prompt then press enter:

```
% cloud

serverless ⚡ cloud

✔ Deployed your personal instance
✔ Enabled automatic syncing and deployment
✔ Enabled log streaming
→ https://<instance-url>

⚡› test
```

This will start running your tests in your personal instance, and then display the results when they finish.

Here is the example output from the to-do example application:

```
10:03:16 a.m. ─  PASS  tests/integration/api.test.js
  ● Console

    console.log
      Serverless Data item size: 73 bytes

      at Object.set (../../opt/nodejs/node_modules/@serverless/cloud/node_modules/@serverless/data_internal/dist/index.js:2:496474)

 PASS  tests/integration/schedule.test.js
  ● Console

    console.log
      Serverless Data item size: 93 bytes

      at Object.set (../../opt/nodejs/node_modules/@serverless/cloud/node_modules/@serverless/data_internal/dist/index.js:2:496474)


Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.597 s, estimated 2 s
Ran all test suites.
```

Notice that console output from your tests is displayed along with your test results.

Let's make a change and break the tests. In `api.test.js` change "Something to do" to "Something else" and then save the file, and enter the `test` command again. We now see this test failure:

```
  ● should post a todo

    expect(received).toEqual(expected) // deep equality

    _ Expected  _ 1
    + Received  + 1

      Object {
        "items": Array [
          Object {
            "id": "123",
    -       "name": "Something else",
    +       "name": "Something to do",
          },
        ],
      }

       7 |   });
       8 |
    >  9 |   expect(body).toEqual({
         |                ^
      10 |     items: [
      11 |       {
      12 |         id: "123",

      at Object.<anonymous> (tests/integration/api.test.js:9:16)
```

Jest provides a detailed report including the reason the test failed and the code location, so you can make the fix and re-run the tests.

## Test helpers

Serverless Cloud's runtime provides some helpers that make it easy to invoke your event handlers in tests.

### API helpers

The API helpers invoke the handler for a given URL and HTTP method.

```js
api.<method>(url).invoke(requestBody)
```

Where `<method>` is the HTTP method you wish to invoke, in lower-case.

Parameters:
  * url (string): URL to request
  * requestBody (object): the body of the request

Return value: object with properties:
  * body: the response body
  * status: the HTTP response status code

### Schedule helpers

The schedule helpers invoke the handler for a given schedule expression.

```js
schedule.every(expression).invoke()
schedule.cron(expression).invoke()
schedule.rate(expression).invoke()
```

Parameters:
  * expression (string): the schedule expression of the handler you wish to invoke

Return value: none

> Note: if there is more than one handler for a given expression, only the first will be invoked. This will be addressed in a future release. For now we recommend only using a single handler for a given schedule.


## Unit tests vs integration tests

In the context of Serverless Cloud a unit test is one where the code under test doesn't access any external services such as Serverless Data. An example is a test for a self-contained utility function, or a test that replaces all external dependencies with mocks.

Unit tests could in theory run in your local development environment instead of in your personal instance, but we recommend that you run all unit and integration tests using the `cloud test` command instead, to simplify your project.
