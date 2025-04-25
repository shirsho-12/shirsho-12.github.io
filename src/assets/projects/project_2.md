# Project Markdown Files

This directory will contain markdown files for projects. Each markdown file should follow this format:

```markdown
---
id: project-2
title: Project 3
description: Short project description
tags:
  - tag1
  - tag2
image: path/to/image.jpg
githubUrl: https://github.com/username/repository
liveUrl: https://example.com
---

# Project Content

Detailed description of the project goes here...
```

The metadata at the top (between the `---` marks) will be parsed and used to generate project cards.
The rest of the content will be displayed in the project details view.
