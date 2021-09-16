---
title: Workflows
menuText: Workflows
menuOrder: 4
has_children: true
has_toc: false
---

## Sample Workflows

Workflows are meant to be flexible, giving each unique team (or single developer) serverless superpowers.

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