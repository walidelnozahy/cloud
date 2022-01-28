---
title: Managing Storage on Instances
menuText: Managing Storage on Instances 
description: Learn how you can view, upload, delete files on Serverless Storage using Serverless Cloud Dashboard
menuOrder: 5
parent: Serverless Cloud Dashboard
---

# Managing Storage on Instances

Serverless Cloud provides its own embedded storage solution [Serverless Storage](https://www.serverless.com/cloud/docs/apps/storage) attached to every instance as a part of its runtime. It's possible to upload, delete, download files in Serverless Storage programmatically using `storage` interface of the Serverless Development Kit but sometimes developers need to check the existence of files, feed their app with default files, create the folder structure for their app etc. manually.
Serverless Cloud provides Storage tab on the Instance Detail page to meet this need. 

Note that this feature is provided in beta and should be used accordingly. 

## Managing Folders on Serverless Storage 

When you upload something programmatically it'll automatically appear under the root folder. However, we strongly recommend using folders for the organization of your app. The below code will automatically create the folder with name `storage-uploads` folder. 

```javascript
	
api.get("/file", async (req, res) => {
  // will redirect to a download url via Storage
  return res.sendFile("storage-uploads/myFile.txt");
});

```

You can create a folder from Serverless Dashboard by clicking on the "Create folder" button as seen below: 

![image](https://user-images.githubusercontent.com/85096820/151606329-a89e02b2-ee3f-45bf-9b0e-eed2cf824ff3.png)

You can also delete folders on Serverless Cloud Dashboard.

## File Actions with Serverless Cloud Dashboard

Serverless Cloud Dashbaord provides a way to upload new files to enable developers prepare the files that their applications would need. You can upload multiple files under root folder or under any folder created. 
You can also delete files by clicking on the file and selecting "Delete Files" option under "Actions" dropdown list. Similarly, you can copy the files under a folder and paste it to elsewhere. Finally, you can
download the files by clicking "Open Selection" under "Actions" dropdown list. 
