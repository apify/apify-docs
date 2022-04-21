---
title: Managing source code quiz answers
description: View in-depth answers for all three of the quiz questions that were provided in the corresponding lesson about managing source code.
menuWeight: 3
paths:
    - professional-scraping/solutions/managing-source
---

## [](#quiz-answers) Quiz answers

- Do you have to rebuild an actor each time the source code is changed?

Yes. It needs to be built into an image, saved in a registry, and later on run in a container.

- In Git, what is the difference between **pushing** changes and making a **pull request**?

The pushing of code changes is usually made to a branch parallel to the one you want to eventually push it to. When creating a pull request, the code is meant to be reviewed, or at least pass all the test suites before being merged into the target branch.

- Based on your knowledge and experience, is the `apify push` command worth using (in your opinion)?

The `apify push` command can sometimes be useful when testing ideas; however, it is much more ideal to use Github integration rather than directly pushing to the platform.
