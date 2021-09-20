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

# Deploy your code to "production"
> deploy production
```
![Diagrams for Documentation](https://user-images.githubusercontent.com/85096820/134012759-0fe45c42-e37b-4080-923b-ec0bc308b70a.png)


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

![Diagrams for Documentation (1)](https://user-images.githubusercontent.com/85096820/134012958-98271f98-8586-40ef-86e7-8b5ce388e5ec.png)


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

![Diagrams for Documentation (2)](https://user-images.githubusercontent.com/85096820/134012984-970873c5-0952-418e-9125-a0b99a5cc3bd.png)


### Learn more about the concepts around building applications:

- [Personal Instances](/cloud/workflows/personal-instances)
- [Preview Instances](/cloud/workflows/preview-instances)
- [Stages](/cloud/workflows/stages)
- [Cloning Instances](/cloud/workflows/cloning)
- [Automated Testing](/cloud/workflows/testing)
- [Promoting Stages](/cloud/workflows/promoting-stages)
- [CI/CD](/cloud/workflows/cicd)
