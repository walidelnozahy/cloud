---
layout: default
title: CLI Reference
nav_order: 7
last_modified_date: 2021-05-30
---

# CLI Reference
{: .no_toc }

The following CLI commands are available to develop, manage, and deploy instances. These are subject to change.

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## `cloud help`

Displays a simple help screen that shows all the available commands and their options.

## `cloud init [--overwrite]`

Copies a basic application example into your current directory. If your current directory is not empty, you can use the optional `--overwrite` (or `-o`) flag.

## `cloud start [--seed]`

Enables interactive development mode and syncs and deploys local changes to your **personal instance**. This will watch your current directory and immediately sync and publish any changes you save. You can enable automatic data reseeding by passing the optional `--seed` flag. When automatic seeding is enabled, changes saved to your `data.json` file will update your **personal instance**'s data.

## `cloud deploy [STAGE]`

Deploys your **personal development instance** *code* to the provided `STAGE`. If no `STAGE` is provided, it will deploy to a `default` stage. 

A `STAGE` is a *long-lived instance* or environment that hosts your service. Common names for `STAGE`s are `prod`, `staging`, `qa`, and `dev`.

## `cloud share [NAME]`

Deploys your **personal development instance** *code AND data* to a preview instance named `NAME`. If no `NAME` is provided, a unique name will be generated for you. 

A **preview instance** is an *ephermeral instance* that you can use to easily share your work with your team. Preview instances allow you to create a stable snapshots of your current **personal instance** so that you can get feedback while continuing to make changes to your own version.

## `cloud clone [NAME] [--overwrite]`

Copies *code AND data** from `NAME` to your **personal development instance**. `NAME` can specify either a stage (like `prod` or `dev`), or a preview instance. If your current directory is not empty, you can use the optional `--overwrite` (or `-o`) flag.

## `cloud seed [--file filename] [--overwrite] `

Seeds data from the `filename` in your local directory to your **personal development instance**. If no `filename` is provided, it will default to `data.json`. By default, the data will be merged with existing data. If you specify the `--overwrite` flag, all data will be cleared and reseeded. 

## `cloud import [NAME] [--to DESTINATION] [--overwrite] `

Imports data from `NAME` to your **personal development instance**. If `--to DESTINATION` is provided, the data will be imported into that `DESTINATION` instance. By default, the data will be merged with existing data. If you specify the `--overwrite` flag, all data will be cleared and the new data will be imported. 

## `cloud export [NAME] [--file filename] [--overwrite] `

Exports data from `NAME` to a JSON file named `filename` in your current working directoy. If no `filename` is provided, it will default to `data.json`. If the `filename` already exists, you can specify the `--overwrite` flag to overwrite the existing file. 

## `cloud list`

Displays a list of **stages** and **preview instances** for the current service.

## `cloud login`

Logs the user in via the browser

## `cloud logout`

Logs the user out of the current session

## `cloud version`

Displays the running version of the CLI.

## `cloud delete NAME`

Deletes instance `NAME` in the current service.