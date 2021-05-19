![serverless-cloud](https://user-images.githubusercontent.com/2053544/108106391-e1f1ff00-705b-11eb-92b2-f63dc6ace812.png)

## Welcome to Serverless Cloud
Serverless Cloud is a hosted platform that makes building, deploying, and managing serverless applications easier and more accessible to everyone. Powered by the world's most trusted CSPs, Serverless Cloud lets you build scalable, highly-secure, pay-per-use applications, without needing a deep knowledge of cloud services. Serverless Cloud provides an exceptional developer experience that lets you focus on writing code, instead of worrying about the infrastructure that's going to run it.

### How it works
Serverless Cloud uses a familiar *Express.js-like* API to allow developers to quickly build REST APIs, create scheduled tasks, and more. Using our lightweight command line tool, we monitor your local directory as you code, and then instanteously publish those changes to your own, fully-isolated **personal development instance**, giving you a high-fidelity cloud environment to test updates in a rapid feedback loop. Plus, you have your own copy of Serverless Data to work with, letting you test your data-driven applications without affecting other team members or production instances.

### Why it matters

The cloud is immensely powerful, but also complex and filled with lots of moving parts. Developers are now wearing more hats than ever before, not only building and designing software, but becoming cloud architects that need to understand countless cloud services, scalable data engines, fault tolerance, and so much more. The goal of Serverless Cloud is to reduce this complexity by focusing on interpretation instead of configuration, and by automatically applying best practices to common use cases, removing the need for all the boilerplate and configuration, and allowing developers to do what they do best: build software.

**PLEASE NOTE: The Serverless Cloud is currently in PRIVATE BETA. If you'd like to sign up for the early access list, please visit [https://serverless.com/cloud](https://serverless.com/cloud).**

## Quick Start

Install...

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

## Writing Your Application

Serverless Cloud uses a familar *Express.js-like* API for building cloud applications. Using the `@serverless/cloud` npm package gives you a simple interface to build `api`s, access `data`, and `schedule` tasks. 

### Importing the `@serverless/cloud` package

In order for your applications to run properly on Serverless Cloud, you need to require some helpers from the `@serverless/cloud` npm package. At the top of your `index.js` file, include the following:

```javascript
const { api, data, schedule } = require("@serverless/cloud");
```

You can then use the `api`, `data`, and `schedule` helpers to build your application.

### Creating REST API routes

API routes in Serverless Cloud use a very similar syntax to Express.js. For more information regarding the Express.js syntax, visit [http://expressjs.com/en/4x/api.html](http://expressjs.com/en/4x/api.html). Some examples include:

```javascript
// Create a GET route for /users
api.get('/user', (req,res) => { ...do something... })

// Create a POST route for /users
api.post('/users', (req,res) => { ...do something... })

// Create a GET route for /users with a dynamic parameter
app.get('/users/:userId', (req,res) => { ...do something with req.params.userId... })
```

### Scheduling tasks

Serverless Cloud also supports scheduled tasks, which you can create using the `schedule` helper. You can either use the `.every()` method for having tasks repeat on a regular time interval.Or you can use the `.cron()` method to have more fine-grained control.

#### Scheduling tasks with `.every()`

If you know you need a task to repeat every hour, or every 5 days, you can use the `.every()` method. This method takes two arguments, a **rate expression** and the function you'd like to run.

For example, the following will log "I run every hour!" every hour:
```javascript
schedule.every('1 hour', () => {
  // This code block will run every hour!
  console.log('I run every hour!');
})
```

A **rate expression** consists of a **numeric value** and a **unit**. Valid **units** are `minute`, `minutes`, `hour`, `hours`, `day` and `days`. 

#### Scheduling tasks with `.cron()`

If you need more control over your scheduled tasks, you can use the `.cron()` method. This method also takes two arguments, a **cron expression** and the function you'd like to run.

For example, the following will log "I run on Tuesdays!" every Tuesday at midnight UTC:
```javascript
schedule.cron('0 0 * * TUE *', () => {
  // This code block will run at midnight on Tuesdays!
  console.log('I run on Tuesdays!');
})
```

**Cron expressions** consist of six fields:

| Field   | Values | Wildcards |
|---------|--------|-----------|
| Minutes | 0-59   | , - * /   |
| Hours   | 0-23   | , - * /   |
| Day-of-month | 1-31 | , - * ? / L W |
| Month   | 1-12 or JAN-DEC | , - * / |
| Day-of-week | 1-7 or SUN-SAT | , - * ? L # |
| Year | 1970-2199 | , - * / |

**Wildcards**

- The , (comma) wildcard includes additional values. In the Month field, JAN,FEB,MAR would include January, February, and March.
- The - (dash) wildcard specifies ranges. In the Day field, 1-15 would include days 1 through 15 of the specified month.
- The * (asterisk) wildcard includes all values in the field. In the Hours field, * would include every hour. You cannot use * in both the Day-of-month and Day-of-week fields. If you use it in one, you must use ? in the other.
- The / (forward slash) wildcard specifies increments. In the Minutes field, you could enter 1/10 to specify every tenth minute, starting from the first minute of the hour (for example, the 11th, 21st, and 31st minute, and so on).
- The ? (question mark) wildcard specifies one or another. In the Day-of-month field you could enter 7 and if you didn't care what day of the week the 7th was, you could enter ? in the Day-of-week field.
- The L wildcard in the Day-of-month or Day-of-week fields specifies the last day of the month or week.
- The W wildcard in the Day-of-month field specifies a weekday. In the Day-of-month field, 3W specifies the weekday closest to the third day of the month.
- The # wildcard in the Day-of-week field specifies a certain instance of the specified day of the week within a month. For example, 3#2 would be the second Tuesday of the month: the 3 refers to Tuesday because it is the third day of each week, and the 2 refers to the second day of that type within the month.

## Using Serverless Data

Access to Serverless Data is automatically included in your runtime environment. It provides a simple interace for persisting and retrieving state. By default, Serverless Data is available through the `data` variable as defined by the `require` statement at the top of the `index.js` file. Serverless Data makes API calls in order to set and retrieve data, so any route/function that calls a Serverless Data method must use `async/await`.

### Setting Items

Setting data with Serverless Data can be accomplished using the `set` method. You provide a **key** as the first argument and a **value** (either a string, boolean, number, array, or object) as the second parameter. Keys are case sensitive and can be `string`s up to 256 bytes each and can contain any valid utf8 character including spaces. By default, the `set` command will return the updated item.

```javascript
await data.set('foo', 'bar');
await data.set('fooNum', 123456);
await data.set('foo-Bool', true);
await data.set('foo_Array', ['val1', 'val2', 'val3']);
await data.set('foo Obj', { key1: 'some val', key2: 'some other val' });
```

**Note:** Leading and trailing spaces are automatically removed from key names, so both `'keyName'` and `' keyName '` would be equivalent.

An options object can be passed as third argument. The following options are supported:

| Option Name | Type | Description | 
| ----------- | -------------- | -------- |
| meta        | `boolean` | Returns a JSON object that contains the item meta data. The value of the item is returned in a `value` field. |
| overwrite   | `boolean` | Overwrites the current key including its meta data. |
| ttl         | `integer` or `ISO 8601 date` | Sets a Time-to-Live on the item. If an integer is provided that is greater than the current epoch in seconds, that is used. Any other integer will be added to the current epoch. A full or partial ISO 8601 date can also be used. |
| label1, label2, label3, label4, label5 | `string` | Additional keys that can be used to reference the item. Five labels are available and like item `key`s, can use collection namespaces. |

```javascript
await data.set('foo', 'bar', { meta: true, ttl: 3600, label1: 'baz', label2: 'baz:bat' });
```

### Using collection namespaces

Keys can be prefixed with a collection namespace. This allows you to group multiple items together and access them as a collection (in whole or in part) instead of needing to `get` each item separately.

Collection namespaces must use a colon (`:`) separator between the namespace and the key name. Collection names are case sensitive, can be `string`s up to 256 bytes, and can contain any valid utf8 character including spaces. 

When using collection namespaces, key names have the following exceptions:
 -  `|` and `*` characters CANNOT be used anywhere in the key name
 -  Key names CANNOT start with `>` or `<` characters

```javascript
✅ await data.set('my-namespace:bat', 'some value');
✅ await data.set('my-namespace:baz', { foo: 'bar' });
✅ await data.set('My Collection Name:Some Key Name', 'some other value');
✅ await data.set(`collection~!@#$%^&*()_+:key-=[]{}:key";'<>?,./`, 'another value');
✅ await data.set(`>simple|key*`, 'simple keys have no character restrictions');
❌ await data.set('some-collection:key with a | in it', 'foobar');
❌ await data.set('some-collection:key with a * in it', 'foobar');
❌ await data.set('some-collection:>some-key', `oops, can't start with a > or <`);
```

The namespace becomes part of the items key, so you must use the full key name (including the namespace) to retrieve that item.

**Note:** Leading and trailing spaces are automatically removed from collection namespaces and key names, so both `'foo:bar'` and `' foo : bar '` would be equivalent.

### Getting Items

Items can be retrieved using the `get` method. This method takes the **key** as the first argument, and an optional **options** object as the second argument. By default, the `get` method will return the value stored in the item.

```javascript
let result = await data.get('foo');

// With a collection namespace
let result = await data.get('my-namespace:bat');
```

In addition to retrieving a single key, you can also retrieve items in a collection by providing the collection name with a colon and a `*` as a wildcard.

```javascript
let results = await data.get('my-namespace:*');
```

This will return an `items` array with all keys in the namespaced collection. By default, the items will be limited to 100 and the keys will be sorted in ascending lexiconigraphical order. These defaults can be changed by providing an options object as the second argument.

The following options are supported:

| Option Name | Type            | Description                                                                                                      |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------- |
| meta        | `boolean`       | Returns a JSON object that contains the item meta data. The value of the item is returned in a `value` field.    |
| limit       | `integer`       | Limits the number of items returned from a collection. Defaults to `100`.                                        |
| reverse     | `boolean`       | Reverses the sort order of keys returned from a collection. Defaults to `false`.                                 |
| start       | `string`        | A key (including namespace) to start retrieving items from. Used for pagination.                                 |
| label       | `enum` (`label1`, ...`label5`) | Access items by their `label` instead of their `key`. Items requests via a label always return an `items` array. |

```javascript
let results = await data.get('my-namespace:*', { limit: 10, reverse: true });
```

If the only option you need to pass is `{ meta: true }`, you can simply pass `true` as the second argument to the `get` method.

```javascript
let results = await data.get('foo', true);
let results = await data.get('my-namespace:bat', true);
let results = await data.get('my-namespace:*', true);
```

### Using conditionals to query items in a collection

Collections give you super powers, allowing you to limit the items returned based on conditional operators.

#### Partial matches

You've already seen the `*` wildcard used to retrieve *all* items from a collection, but you can also use the wildcard to retrieve items with partially matching keys as well. **Note:** Wildcards are only supported at the end of a key expression.

```javascript
// Retrieve all keys from the `user123` collection
let results = await data.get('user123:*');

// Retrieve all keys from the `user123` collection that start with 'orders'
let results = await data.get('user123:orders*', true);
```

#### Greater than and Less than

Keys in collections are sorted in lexiconigraphical order, so you can retrieve all items from a collection that are greater than, greater than or equal to, less than, or less than or equal to a supplied key. Use the standard symbols (`>`, `>=`, `<`, `<=`) after the collection name and colon to filter the return items.

```javascript
// Retrieve all keys from the `user123` collection greater than 2021-05-18
let results = await data.get('user123:>2021-05-18');

// Retrieve all keys from the `user123` collection greater than or equal to 2021-05-18
let results = await data.get('user123:>=2021-05-18');

// Retrieve all keys from the `user123` collection less than 2021-05-18
let results = await data.get('user123:<2021-05-18');

// Retrieve all keys from the `user123` collection less than or equal to 2021-05-18
let results = await data.get('user123:<=2021-05-18');
```

#### Retrieving items between two keys

If you want to retrieve items that are lexiconigraphically between two keys, specify the two partial keys between a `|`.

```javascript
// Retrieve all keys between 2021-05-01 and 2021-05-31
let results = await data.get('user123:2021-05-01|2021-05-31');
```

### Getting items by their labels

You can get items by their labels using the `get` method and the `{ label: 'labeln' }` option, or you can use the `getByLabel` convenience method. This method takes the label as the first parameter (e.g. `label3`), the `key` as the second parameter, and then an optional third parameter that accepts all the same options as the `get` method.

Labels support collections as well as simple keys. Since they behave the same way, you can also use collection querying methods like `*` and `>=` on labels as well.

Labels are incredibly powerful, allowing you to pivot and access your data in multiple "views". For example, if you store orders in a "user" collection (e.g. `user-1234`), then you can store their order date and number as the key (e.g. `user-1234:ORDER_2021-05-18_9321`). This would let you list all (or some) of their orders and sort them by date. But if you wanted to access this same information by the unique order number (`9321`), a simple key-value store wouldn't let you. With Serverless Data, you can set `label1` to something like `ORDER-9321`. Now you can either get the orders *BY USER* or *BY ORDER ID*:

```javascript
// Set the order
let newOrder = await data.set(
  'user-1234:ORDER_2021-05-18_9321', // the key
  { ...the-order-data-here... }, // the details of the order
  { label1: 'ORDER-9321' } // our order id label
)

// Get all orders for user-1234
let user_orders = await data.get('label1','user-1234:ORDER_*');

// Get ORDER 9321
let order = await data.getByLabel('label1','ORDER-9321');
```

### Getting multiple items by their key

If you'd like to retrieve multiple items that aren't part of the same collection, you can specify an `array` of keys as the first argument in the `get` method. Keys must be the complete `key` as wildcards and other conditionals are not supported in batch operations. You can specify up to 25 keys in each request.

```javascript
let results = await data.get(['key1', 'someOtherKey', 'namespacedKey:keyX']);
```

## Feedback

Many parts of this are still experimental, so please keep that in mind when testing. Please log any issues and additional feedback can be sent to cloud@serverless.com.

# CLI

## Commands

The following CLI commands are available to develop, manage, and deploy instances. These are subject to change.

#### `cloud help`

Displays a simple help screen that shows all the available commands and their options.

#### `cloud init [--overwrite]`

Copies a basic application example into your current directory. If your current directory is not empty, you can use the optional `--overwrite` (or `-o`) flag.

#### `cloud start [--seed]`

Enables interactive development mode and syncs and deploys local changes to your **personal instance**. This will watch your current directory and immediately sync and publish any changes you save. You can enable automatic data reseeding by passing the optional `--seed` flag. When automatic seeding is enabled, changes saved to your `data.json` file will update your **personal instance**'s data.

#### `cloud deploy [STAGE]`

Deploys your **personal development instance** *code* to the provided `STAGE`. If no `STAGE` is provided, it will deploy to a `default` stage. 

A `STAGE` is a *long-lived instance* or environment that hosts your service. Common names for `STAGE`s are `prod`, `staging`, `qa`, and `dev`.

#### `cloud share [NAME]`

Deploys your **personal development instance** *code AND data* to a preview instance named `NAME`. If no `NAME` is provided, a unique name will be generated for you. 

A **preview instance** is an *ephermeral instance* that you can use to easily share your work with your team. Preview instances allow you to create a stable snapshots of your current **personal instance** so that you can get feedback while continuing to make changes to your own version.

#### `cloud clone [NAME] [--overwrite]`

Copies *code AND data** from `NAME` to your **personal development instance**. `NAME` can specify either a stage (like `prod` or `dev`), or a preview instance. If your current directory is not empty, you can use the optional `--overwrite` (or `-o`) flag.

#### `cloud seed [--file filename] [--overwrite] `

Seeds data from the `filename` in your local directory to your **personal development instance**. If no `filename` is provided, it will default to `data.json`. By default, the data will be merged with existing data. If you specify the `--overwrite` flag, all data will be cleared and reseeded. 

#### `cloud import [NAME] [--to DESTINATION] [--overwrite] `

Imports data from `NAME` to your **personal development instance**. If `--to DESTINATION` is provided, the data will be imported into that `DESTINATION` instance. By default, the data will be merged with existing data. If you specify the `--overwrite` flag, all data will be cleared and the new data will be imported. 

#### `cloud export [NAME] [--file filename] [--overwrite] `

Exports data from `NAME` to a JSON file named `filename` in your current working directoy. If no `filename` is provided, it will default to `data.json`. If the `filename` already exists, you can specify the `--overwrite` flag to overwrite the existing file. 

#### `cloud list`

Displays a list of **stages** and **preview instances** for the current service.

#### `cloud login`

Logs the user in via the browser

#### `cloud logout`

Logs the user out of the current session

#### `cloud version`

Displays the running version of the CLI.

#### `cloud delete NAME`

Deletes instance `NAME` in the current service.
