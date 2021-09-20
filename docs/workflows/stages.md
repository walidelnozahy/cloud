---
title: Stages
menuText: Stages
menuOrder: 3
parent: Worklows
---

When you're ready to show your work to the world, you can _deploy_ your code to a **stage**. These are permanent instances like `prod`, `staging` and `dev`. Deploying to a stage is achieved typing `deploy <stage-name>` on Cloud Shell and by typing `cloud deploy <stage-name>` from your terminal. This command will publish only the **CODE** to a permanent stage, creates a new stage if there's no stage with this name. 

```
# Start your project from Cloud Shell
> cloud

# Edit your code locally and watch the changes automatically

# Deploy the app when you feel ready to a named stage.
> deploy <stage-name>
```

When you need to deploy directly from terminal:

```
# Deploy directly from terminal
> cloud deploy <stage-name>
```

## Stages for Solo Developers 

Even when you're working alone, it's better to have a way of sharing the work you're proud of with the rest of the world. Solo developers can take advantage of stages when it's time to show the work. Here's an example workflow of a solo developer using stages on Serverless Cloud. TO-DO: Image here (Serverless Cloud-SingleDeveloper w/ CodeRepository.png)


```
# Start your project from Cloud Shell
> cloud

# Edit your code locally and watch the changes automatically and quit Cloud Shell
> quit

# Run your tests before you push it to a permanent stage. 
> cloud test

# Deploy your changes to prod the permanent stage if there's no issue or let your CI process handle the rest.
> cloud deploy prod
```

## Stages for Development Teams

When working with a team, it's required to share your work with your colleagues for collaboration, CI/CD, manual testing and more. Serverless Cloud provides an efficient way of sharing your work with your team integrated with feature branches and your preffered CI/CD solution. Here's an example workflows that shows how a team could collaborate better with stages on Serverless Cloud. TO-DO: Image here (Serverless Cloud Developer Team with CodeRepository.png)

```
# Start your project from Cloud Shell
> cloud

# Edit your code locally and watch the changes automatically and quit Cloud Shell
> quit

# Run your tests before you push it to a permanent stage. 
> cloud test

# Share your work with your colleagues by creating a preview instance that has the same code and data with your personal instance
> cloud share 

# Manual tests are okay so we can let CI run its tasks and push the app to prod. 
> cloud deploy prod
```
