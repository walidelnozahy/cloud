---
title: Workflows
menuText: Workflows
menuOrder: 4
has_children: true
has_toc: false
---

# Workflows in Serverless Cloud

Serverless Cloud lets you deliver applications both when you are building alone and with your colleagues. Run your tests against Cloud, share your work with colleagues, integrate with your favorite CI/CD tool. Below are some example workflows for delivering applications fast. 

### Single Developer with a sample project

```
# Initialize a sample project with interactive development mode on Cloud Shell
> cloud

# Edit your code locally and watch the changes automatically
# deploy into your own developer instance

# Deploy your code to "production"
> deploy production
```

### Single Developer editing/debugging an existing project

```
# Clone the "dev" stage
> cloud clone dev

# Enable interactive development mode
> cloud

# Edit your code locally and test the changes in
# your developer instance

# Deploy your code back to "dev"
> deploy dev
```

### Team collaborating on a project

```
# Enable interactive development mode
> cloud

# Edit code locally and test the changes in your
# developer instance

# Share your code and data with your team in a preview instance
> share feature-1

# Continue to work on your developer instance and make changes as feedback comes in.
# Share the changes with your team (to the same preview instance)
> share feature-1 --overwrite

# Once the team is happy with the changes, publish to "dev"
# for additional integration tests and feedback
> deploy dev
```


### Learn more about the concepts around building applications:

- [Developer Instances](/cloud/workflows/developer-instances)
- [Preview Instances](/cloud/workflows/preview-instances)
- [Stages](/cloud/workflows/stages)
- [Cloning Instances](/cloud/workflows/cloning)
- [Automated Testing](/cloud/workflows/testing)
- [Promoting Stages](/cloud/workflows/promoting-stages)
- [CI/CD](/cloud/workflows/cicd)