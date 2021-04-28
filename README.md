![serverless-cloud](https://user-images.githubusercontent.com/2053544/108106391-e1f1ff00-705b-11eb-92b2-f63dc6ace812.png)

## Welcome to Serverless Cloud
Serverless Cloud is a hosted platform that makes building, deploying, and managing serverless applications easier and more accessible to everyone. Powered by the world's most trusted CSPs, Serverless Cloud lets you build scalable, highly-secure, pay-per-use applications, without needing a deep knowledge of cloud services. Serverless Cloud provides an exceptional developer experience that lets you focus on writing code, instead of worrying about the infrastructure that's going to run it.

### How it works
Serverless Cloud uses a familiar *Express.js-like* API to allow developers to quickly build REST APIs, create scheduled tasks, and more. Using our lightweight command line tool, we monitor your local directory as you code, and then instanteously publish those changes to your own, fully-isolated sandbox, giving you a high-fidelity cloud environment to test updates in a rapid feedback loop. Plus, you have your own copy of Serverless Data to work with, letting you test your data-driven applications without affecting other team members or production instances.

### Why it matters

The cloud is immensely powerful, but also complex and filled with lots of moving parts. Developers are now wearing more hats than ever before, not only building and designing software, but becoming cloud architects that need to understand countless cloud services, scalable data engines, fault tolerance, and so much more. The goal of Serverless Cloud is to reduce this complexity by automatically applying best practices to common use cases, removing the need for all the boilerplate and configuration, and allowing developers to do what they do best: build software.

**PLEASE NOTE: The Serverless Cloud is currently in PRIVATE BETA. If you'd like to sign up for the early access list, please visit [https://serverless.com/cloud](https://serverless.com/cloud).**


## Quick Start

Install...

```
npm i -g @serverless/cloud-cli@latest
```

create a new directory...

```
mkdir my-cloud && cd my-cloud
```

Start developing...

```
sc dev
```

Visit the url, see live logs, make changes, and watch them quickly deploy to your own personal dev instance. And when you're ready, copy to prod:

```
sc copy --target prod
```

This will be a completely separate instance. You may continue developing with `sc dev` without affecting `prod`, but anytime you wanna copy the entire `prod` instance (including data) into your own personal dev instance, just run:

```
sc copy --source prod
```

And starting developing on the code copied from `prod`:

```
sc dev
```

## Writing Your Application

Serverless Cloud uses a familar *Express.js-like* API for building applications. Instead of including `express`, you'll include `@serverless/cloud` instead. You can then create routes with the standard syntax like `app.get('/hello', (req,res) => { ...do something.. })`. For more information regarding the Express.js syntax, visit [http://expressjs.com/en/4x/api.html](http://expressjs.com/en/4x/api.html)

Serverless Cloud also supports scheduled tasks, which you can create using the `app.schedule()` method. This method takes two arguments, a **schedule expression** as defined by [AWS's syntax](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html), and a function to run on that schedule.

For example, the following will log "Run schedule!" every hour:
```javascript
app.schedule('rate(1 hour)', () => {
  // This code block will run every hour!
  console.log('Run schedule!');
})
```

## Using Serverless Data

Access to Serverless Data is automatically included in your runtime environment. It can also be included locally by installing `npm i @serverless/data` from npm. It provides a simple interace for persisting and retrieving state. By default, Serverless Data is available through the `data` variable as defined by the `require` statement at the top of the `index.js` file. Serverless Data makes API calls in order to set and retrieve data, so any route/function that calls a Serverless Data method must use `async/await`.

### Setting Items

Setting data with Serverless Data can be accomplished using the `set` method. You provide a **key** as the first argument and a **value** (either a string, boolean, number, array, or object) as the second parameter. By default, the `set` command will return the updated item.

```javascript
await data.set('foo', 'bar');
await data.set('fooNum', 123456);
await data.set('fooBool', true);
await data.set('fooArray', ['val1', 'val2', 'val3']);
await data.set('fooObj', { key1: 'some val', key2: 'some other val' });
```

An options object can be passed as third argument. The following options are supported:

| Option Name | Type                         | Description                                                                                                                                                                                                                          |
| ----------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| meta        | `boolean`                    | Returns a JSON object that contains the item meta data. The value of the item is returned in a `value` field.                                                                                                                        |
| overwrite   | `boolean`                    | Overwrites the current key including its meta data.                                                                                                                                                                                  |
| ttl         | `integer` or `ISO 8601 date` | Sets a Time-to-Live on the item. If an integer is provided that is greater than the current epoch in seconds, that is used. Any other integer will be added to the current epoch. A full or partial ISO 8601 date can also be used. |
| label*n*       | `string`                     | Additional keys that can be used to reference the item. Five labels are available and like item `key`s, can use collection namespaces. |

```javascript
await data.set('foo', 'bar', { meta: true, ttl: 3600, label1: 'foox', label2: 'fooy' });
```

### Using collection namespaces

Keys can be modified using a collection namespace. This allows you to group multiple items together and access them as a collection (in whole or in part) instead of needing to get each item separately.

Collection namespaces can prefix keys and must use a colon (`:`) separator between the namespace and the key.

```javascript
await data.set('my-namespace:bat', 'some value');
await data.set('my-namespace:baz', 'some other value');
```

The namespace becomes part of the items key, so you must use the full key name (including the namespace) to retrieve an item.

### Getting Items

Items can be retrieved using the `get` method. This method takes the **key** as the first argument, and an optional **options** object as the second argument. By default, the `get` method will return the value stored in the item.

```javascript
let result = await data.get('foo');

// With a namespace
let result = await data.get('my-namespace:bat');
```

In addition to retrieving a single key, you can also retrieve items in a collection by providing just the collection name with a colon and no key after it.

```javascript
let results = await data.get('my-namespace:');
```

This will return an `items` array with all keys in the namespaced collection. By default, the items will be limited to 100 and the keys will be sorted in ascending lexiconigraphical order. These defaults can be changed by providing an options object as the second argument.

The following options are supported:

| Option Name | Type            | Description                                                                                                      |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------- |
| meta        | `boolean`       | Returns a JSON object that contains the item meta data. The value of the item is returned in a `value` field.    |
| limit       | `integer`       | Limits the number of items returned from a collection. Defaults to `100`.                                        |
| reverse     | `boolean`       | Reverses the sort order of keys returned from a collection. Defaults to `false`.                                 |
| start       | `string`        | A key (including namespace) to start retrieving items from. Used for pagination.                                 |
| eq          | `string`        | Limits the items returned to keys that match this value.                                                         |
| lt          | `string`        | Limits the items returned to keys that are less than this value.                                                 |
| lte         | `string`        | Limits the items returned to keys that are less than or equal to this value.                                     |
| gt          | `string`        | Limits the items returned to keys that are greater than this value.                                              |
| gte         | `string`        | Limits the items returned to keys that are greater than or equal to this value.                                  |
| between     | `array`/`tuple` | Limits the items returned to keys that are between the first item in the array and the second item in the array. |
| begins      | `string`        | Limits the items returned to keys that begin with this value.                                                    |
| label       | `enum` (`label1`, ...`label5`) | Access items by their `label` instead of their `key`. Items requests via a label always return an `items` array. |

```javascript
let results = await data.get('my-namespace:', { limit: 10, between: ['foo', 'zoo'] });
```

If the only option you need to pass is `{ meta: true }`, you can simply pass `true` as the second argument to the `get` method.

### Getting items by their labels

You can get items by their labels using the `get` method and the `{ label: 'labeln' }` option, or you can use the `getByLabel` convenience method. This method takes the label as the first parameter (e.g. `label3`), the `key` as the second parameter, and then an optional third parameter that accepts all the same options as the `get` method.

### Getting multiple items by their key

If you'd like to retrieve multiple items that aren't part of the same collection, you can specify an `array` of keys as the first argument in the `get` method.

```javascript
let results = await data.get(['key1', 'someOtherKey', 'namespacedKey:keyX']);
```

### A word about "labels"

Labels are an experimental concept and are likely to change to include more features. However, labels currently work just like `keys` and can have their own namespaced collections. Each label is independent of any namespaces for `keys` or other labels, so there is no conflict between `keys`, `label1`, `label2`, `label3`, `label4`, and `label5`. These dedicated slots allow you to create multiple views of your items.

## Feedback

Many parts of this are still experimental, so please keep that in mind when testing. Please log any issues and additional feedback can be sent to cloud@serverless.com.

# CLI

## Commands

The following CLI commands are available to develop, seed data, deploy instances, and perform basic instance management. These are subject to change.

#### `sc dev`

Initializes dev mode for the service instance in the cwd. If the cwd is empty, a boilerplate will be generated and deployed for you.

#### `sc copy [--source INSTANCE-NAME] [--target INSTANCE-NAME] [--data] [--download]`

Copies a `source` instance to the `target` instance. If no `target` is provided, it will default to the user's current working instance. If no `source` is provide, it will default to the user's current working instance.

An optional `--data` flag will also copy data from the `source` instance to the `target` instance. 

```bash
# Copy 'prod' instance to working instance
$ sc copy --source prod

# Copy working instance to 'prod' instance
$ sc copy --target prod

# Copy 'staging' instance to 'prod' instance
$ sc copy --source staging --target prod

# Sync local directory with working instance
$ sc copy
```

#### `sc seed [--source INSTANCE-NAME] [--target INSTANCE-NAME]`

Seeds data from the `source` instance to the `target` instance. If no `target` is provided, it will default to the user's current working instance. If no `source` is provide, it will default to the user's current working instance. If no `source` or `target` is provided, it will seed from a `data.json` file in your current working directory.

```bash
# Seed working instance with 'staging' instance data
$ sc seed --source staging

# Seed 'staging' instance with working instance data
$ sc seed --target staging

# Seed 'test' instance with 'staging' instance data
$ sc seed --source staging --target test

# Seed working instance from local `data.json` file
$ sc seed
```

#### `sc list`

Displays a list on instances for the current service.

#### `sc create INSTANCE-NAME`

Creates a new instance in the current service.

#### `sc login`

Logs the user in via the browser

#### `sc logout`

Logs the user out of the current session

#### `sc version`

Displays the running version of the CLI.

#### `sc delete INSTANCE-NAME`

Deletes an instance in the current service.




