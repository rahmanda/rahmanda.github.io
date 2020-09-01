---
title: Silent Vue Warning on Jest
slug: silent-vue-warning-on-jest
published_date: 2020-08-31
language: en
type: til
translations:
  id: /til/id/#mematikan-vue-warning-di-jest
---

If you need to use `shallowMount` but your app are using globally registered components, you might get annoyed by so many warning logs appear on your terminal when running the unit testings.

To turn off the warnings, put this code below on your test setup files defined in your [jest configuration](https://jestjs.io/docs/en/configuration#setupfilesafterenv-array).

``` js
global.beforeEach(() => {
  // surpress Vue warn
  spyOnConsoleError = jest.spyOn(global.console, 'error').mockImplementation(message => {
    if (!String(message).includes('[Vue warn]: : Unknown custom element')) {
      consoleError(message);
    }
  });
});
```

This will let jest to silence only the unknown custom element error.
