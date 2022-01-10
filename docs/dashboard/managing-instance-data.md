---
title: Managing Data on Instances
menuText: Managing Data on Instances 
description: Learn how you can query, edit and delete data on Serverless Data using Serverless Cloud Dashboard
menuOrder: 4
parent: Serverless Cloud Dashboard
---

# Managing Data on Instances

Serverless Cloud provides its own K/V data store called [Serverless Data](https://www.serverless.com/cloud/docs/apps/data) attached to every instance as a part of its runtime. It's possible to manipulate Serverless Data programmatically using `data` interface of the Serverless Development Kit but sometimes developers need to view data, delete some items, or repair them to keep the integrity. Serverless Cloud provides Data tab on the Instance Detail page to meet this need. 

Note that this feature is provided in beta and should be used accordingly. 

## Querying Serverless Data with Data Manager

Using Data Manager, you can view all the data of an instance or you can view specific items by querying by the key. Note that you can use the conditionals explained [here](https://www.serverless.com/cloud/docs/apps/data#using-conditionals-to-query-items-in-a-collection) to filter the data required. In the below image, you see that we are trying to see the items whose id is less than 3. 

![Screen Shot 2022-01-10 at 11 25 12 AM](https://user-images.githubusercontent.com/85096820/148736445-1d95b828-a4ef-4885-9d9d-e9f051f56a82.png)

Besides the primary index, you can also run queries on [labels](https://www.serverless.com/cloud/docs/apps/data#getting-items-by-their-labels) to filter data. In the below example, we filter all the completed todo items with a query. 

![Screen Shot 2022-01-10 at 11 36 47 AM](https://user-images.githubusercontent.com/85096820/148737577-8b5ac3aa-f34f-4d72-a5fa-8cf4e8bf1544.png)

You can switch to JSON view to see the fields of items in a more developer-friendly way. 

![Screen Shot 2022-01-10 at 11 38 15 AM](https://user-images.githubusercontent.com/85096820/148737760-54ff0206-a570-4eb5-a07f-fa7f0991bb27.png)

Note that the results are paginated and the page size is 100 by default. You can increase it to 1000 if you prefer. 

## Adding new items with Data Manager

There might be some cases where you need to run a quick test with an exact data. You can always [populate data for tests](https://www.serverless.com/cloud/docs/workflows/testing#writing-tests) on Serverless Cloud with `beforeAll` function, but it's sometimes a tiny case that needs a quick turnaround. In such cases, you can add items using the Data Manager. In the below image, we are adding a new todo item by providing a key, value, and/or any additional metadata. 

![Screen Shot 2022-01-10 at 11 47 42 AM](https://user-images.githubusercontent.com/85096820/148739340-7aaccf0f-a397-44a9-b57c-9126cf68182e.png)

## Deleting items with Data Manager

Developers may also need to delete some data to preserve the integrity of data, to test a specific case, or for any other reason. In such cases, the Data Manager lets you delete items from Serverless Data. Please note that this operation is irreversible and should be used accordingly. 

![Screen Shot 2022-01-10 at 12 04 12 PM](https://user-images.githubusercontent.com/85096820/148740779-9a193e92-76b3-4a31-ac89-0a5665bb8330.png)
