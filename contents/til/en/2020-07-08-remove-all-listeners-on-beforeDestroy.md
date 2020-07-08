---
title: Remove all listeners on beforeDestroy!
slug: remove-all-listeners-on-beforeDestroy
published_date: 2020-07-08
language: en
type: til
translations:
  id: /til/id/#hapus-semua-listener-di-beforeDestroy
---

Removing listeners has become a common knowledge when working on front-end stuff, however I still manage to forget about it just now. This time, I didn't remove a scroll listener on my page component which caused an error when I navigate to another page.

This is because the callback for the listener was still accessing the component's context which, of course, had been deleted when navigating away from the page. The solution is simple, just add a `removeEventListener` inside of `beforeDestroy` lifecycle:


``` html
<script>
export default {
  // ...
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollCallback)
  }
}
</script>
```

Even though people say that we don't need to take care of it as long as we are using a modern browser (which has a smart garbage collector), this thing can still happen especially if your app has a client side routing. So, don't forget to remove all listeners folks!
