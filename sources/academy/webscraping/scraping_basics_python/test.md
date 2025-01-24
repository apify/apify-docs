---
title: Test
sidebar_label: Test
description: Test
sidebar_position: 13
slug: /scraping-basics-python/test
---

import Exercises from './_exercises.mdx';

**Test**

---

1. Open the [F1 news page](https://www.theguardian.com/sport/formulaone).
1. Activate the element selection tool in your DevTools.
1. Click on the first post.
1. Notice that the markup does not provide clear, reusable class names for this task. The structure uses generic tags and randomized classes, requiring you to rely on the element hierarchy and order instead.
1. In the **Console**, execute `post = document.querySelector('#maincontent ul li')`. This returns the element representing the first post.
1. Extract the post's title by executing `post.querySelector('h3').textContent`.
1. Extract the lead paragraph by executing `post.querySelector('span div').textContent`.
1. Extract the photo URL by executing `post.querySelector('img').src`.
