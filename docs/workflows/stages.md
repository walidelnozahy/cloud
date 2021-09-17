---
title: Stages
menuText: Stages
menuOrder: 3
parent: Worklows
---

# Stages 

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

Even when you're working alone, it's better to have a way of sharing the work you're proud of with the rest of the world. Solo developers can take advantage of stages when it's time to show the work. Here's an example workflow that a solo developer can follow with stages. TO-DO: Image here 


```
# Start your project from Cloud Shell
> cloud

# Edit your code locally and watch the changes automatically and quit Cloud Shell
> quit

# Run your tests before you push it to a permanent stage. 
> cloud test

# Deploy your changes to prod the permanent stage if there's no issue
> cloud deploy prod
```

## Stages for Development Teams

When working with a team, it's important to share your work with your teammates in the same department and also with QA and other teams. Serverless Cloud provides an efficient way of sharing your work with your team integrated with feature branches and your preffered CI/CD solution. 