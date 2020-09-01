---
title: Dealing with &nbsp; on unit testing
slug: dealing-with-nbsp-on-unit-testing
published_date: 2020-09-01
language: en
type: til
translations:
  id: /til/id/#berurusan-dengan-nbsp-di-unit-testing
---

Sometimes we need to use `&nbsp;` in our HTML as opposed to a space. However because `&nbsp;` has a different byte code, the comparison between `&nbsp;` and a space will always return false. That's why if we want to do assertion with an HTML text containing `&nbsp;` characters, we need to replace spaces with `\u00a0` (`&nbsp;` will be transformed to unix code when rendered).

``` js
const mount = function render() {
  return <p>&nbsp;</p>;
}

const wrapper = mount();

expect(wrapper.text()).toBe(' '); // false
expect(wrapper.text()).toBe('\u00a0'); // true
```
