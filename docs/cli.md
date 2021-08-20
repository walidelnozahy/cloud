---
layout: default
title: CLI Reference
nav_order: 5
last_modified_date: 2021-06-15
---

# CLI Reference

{: .no_toc }

The following CLI commands are available to develop, manage, and deploy instances. These are subject to change.

**Current CLI Version:** `v0.0.17`

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## `cloud [--seed] [--org] [--service]`

Enables interactive development mode and syncs and deploys local changes to your **personal instance**. This will watch your current directory and immediately sync and publish any changes you save. You can enable automatic data reseeding by passing the optional `--seed` flag. When automatic seeding is enabled, changes saved to your `data.json` file will update your **personal instance**'s data. You can update the organization and/or service of the app attached to your personal instance by passing the optional --org and --service flags respevctively. 

## `cloud help`

Displays a simple help screen that shows all the available commands and their options.


## `cloud test`

Starts interactive development mode and runs your tests on Cloud. Enter `test` to re-run your tests in interactive development mode when you are in Cloud Shell.

## `cloud share [NAME]`

Deploys your **personal development instance** _code AND data_ to a preview instance named `NAME`. If no `NAME` is provided, a unique name will be generated for you.

A **preview instance** is an _ephermeral instance_ that you can use to easily share your work with your team. Preview instances allow you to create a stable snapshots of your current **personal instance** so that you can get feedback while continuing to make changes to your own version.

## `cloud deploy [STAGE]`

Deploys your **personal development instance** _code_ to the provided `STAGE`. If no `STAGE` is provided, it will deploy to a `default` stage.

A `STAGE` is a _long-lived instance_ or environment that hosts your service. Common names for `STAGE`s are `prod`, `staging`, `qa`, and `dev`.


## `cloud clone [SERVICE_NAME/INSTANCE_NAME] [--overwrite]`

Copies **code** AND **data** from `INSTANCE_NAME` of service `SERVICE_NAME` to your **personal development instance**. `INSTANCE_NAME` can specify either a stage (like `prod` or `dev`), or a preview instance. If your current directory is not empty, you can use the optional `--overwrite` (or `-o`) flag.

## `cloud promote [from] [to]`

Promotes a stage to another stage by copying only the code [from] stage [to] stage.

## `cloud import [FILENAME] [--overwrite] `

Seeds data from the `FILENAME` in your local directory to your **personal development instance**. If no `FILENAME` is provided, it will default to `data.json`. By default, the data will be merged with existing data. If you specify the `--overwrite` flag, all data will be cleared and reseeded.

## `cloud export [FILENAME] [--overwrite] `

Exports data from your **personal development instance** to a JSON file named `FILENAME` in your current working directoy. If no `FILENAME` is provided, it will default to `data.json`. If the `FILENAME` already exists, you can specify the `--overwrite` flag to overwrite the existing file.

## `cloud list`

Displays a list of **stages** and **preview instances** for the current service.

## `cloud login`

Logs the user in via the browser

## `cloud logout`

Logs the user out of the current session

## `cloud version`

Displays the running version of the CLI.

## `cloud activate [code]`

Activates Serverless Cloud with an exclusive access code. 
