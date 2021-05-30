---
layout: default
title: Serverless Data
nav_order: 2
parent: Building Applications
last_modified_date: 2021-05-30
---

# Using Serverless Data
{: .no_toc }

Access to Serverless Data is automatically included in your runtime environment. It provides a simple interace for persisting and retrieving state. By default, Serverless Data is available through the `data` variable as defined by the `require` statement at the top of the `index.js` file. Serverless Data makes API calls in order to set and retrieve data, so any route/function that calls a Serverless Data method must use `async/await`.

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## Setting Items

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

## Using collection namespaces

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

## Getting Items

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

## Using conditionals to query items in a collection

Collections give you super powers, allowing you to limit the items returned based on conditional operators.

### Partial matches

You've already seen the `*` wildcard used to retrieve *all* items from a collection, but you can also use the wildcard to retrieve items with partially matching keys as well. **Note:** Wildcards are only supported at the end of a key expression.

```javascript
// Retrieve all keys from the `user123` collection
let results = await data.get('user123:*');

// Retrieve all keys from the `user123` collection that start with 'orders'
let results = await data.get('user123:orders*', true);
```

### Greater than and Less than

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

### Retrieving items between two keys

If you want to retrieve items that are lexiconigraphically between two keys, specify the two partial keys between a `|`.

```javascript
// Retrieve all keys between 2021-05-01 and 2021-05-31
let results = await data.get('user123:2021-05-01|2021-05-31');
```

## Getting items by their labels

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

## Getting multiple items by their key

If you'd like to retrieve multiple items that aren't part of the same collection, you can specify an `array` of keys as the first argument in the `get` method. Keys must be the complete `key` as wildcards and other conditionals are not supported in batch operations. You can specify up to 25 keys in each request.

```javascript
let results = await data.get(['key1', 'someOtherKey', 'namespacedKey:keyX']);
```