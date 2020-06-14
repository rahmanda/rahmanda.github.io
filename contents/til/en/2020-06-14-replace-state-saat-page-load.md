---
title: Replace state on page load
slug: replace-state-on-page-load
published_date: 2020-06-14
language: en
type: til
translations:
  id: /til/id/#replace-state-saat-page-load
---

Every time you control history via JS with `window.history` and use `onpopstate` to handle back button, you have to include `replaceState`on page load. This is because when a user hits a URL for the first time, the history for the page will have an empty state and it will cause a bug when a user tries to revisit this page using back button.

