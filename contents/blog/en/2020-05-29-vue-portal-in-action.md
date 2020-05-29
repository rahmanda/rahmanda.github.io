---
title: Vue Portal In Action
summary: I share some real cases of using vue portal to improve your app structure
slug: vue-portal-in-action
published_date: 2020-05-29
language: en
type: blog
translations:
  id: /blog/id/studi-kasus-penggunaan-vue-portal/
---

Have you ever found yourself in a situation where you need to change a component's state from another component which is far away in your component's structure? You probably may end up using event bus or a state management just to stay away from the horrible feeling of creating tons of emitters through many components' layer. Now with the portal concept, you just found another alternative.

## The Concept

The concept is actually quite simple. Instead of using event and global state, you will make use of components for it. Create a component as a portal target, and then you can instantly transport tags or components there from anywhere by wrapping your component with a portal gate which has been pointed to the target. This way, we can get creative when structuring our app without worrying about where the component will be displayed.

---

To give you a better idea about the real usage of this concept, let me show you some portal usages in Vue.

## Case 1: Modal in button

Let's say that our app has several buttons. When we click on the button, it will show a modal.

``` html
<!-- main component -->
<!-- App.vue -->
<template>
  <div>
    <div class="actions">
      <button @click="openCreateModal">Create a post</button>
      <button @click="openEditModal">Edit a post</button>
      <button @click="openConfirmModal">Delete a post</button>
    </div>
    <div v-if="showCreateModal" class="modal">
      <!-- create modal content goes here -->
      <button @click="closeCreateModal">Close</button>
    </div>
    <div v-if="showEditModal" class="modal">
      <!-- edit modal content goes here -->
      <button @click="closeEditModal">Close</button>
    </div>
    <div v-if="showConfirmModal" class="modal">
      <!-- delete modal content goes here -->
      <button @click="closeConfirmModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCreateModal: false,
      showEditModal: false,
      showConfirmModal: false,
    };
  },
  methods: {
    openCreateModal() {
      this.showCreateModal = true;
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },
    openEditModal() {
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    openConfirmModal() {
      this.showConfirmModal = true;
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
    },
  },
};
</script>
```
If we want to introduce another modal, we need to create a state and methods to toggle it. However if you think about it, these modals actually only interact with their respective button to maintain its state. To improve our app structure, we should make an abstraction out of them in order to keep all the relevant logic in the same place.

The problem is, we can't move the modal component away to reduce the logic in the `App.vue`. All modals should live in `App.vue` because we need to apply `z-index` which depends on the depth of a tag (a child tag cannot appear above its parent tag even if the tag has a higher `z-index`). With [vue-portal](https://portal-vue.linusb.org/), we can group modal and button into a single component.

``` html
<!-- CreatePostButton.vue -->
<template>
  <button @click="openModal">
    Create a post
    <!-- wrap our modal with portal -->
    <!-- the 'to' value should be the same as our portal-target name in App.vue -->
    <portal v-if="showModal" to="app">
      <div class="modal">
        <!-- modal content goes here -->
        <button @click="closeModal">Close</button>
      </div>
    </portal>
  </button>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<!-- App.vue -->
<template>
  <div>
    <div class="actions">
      <create-post-button/>
      <edit-post-button/>
      <delete-post-button/>
    </div>

    <!-- by default, portal-target will become a div tag in actual DOM -->
    <portal-target name="app"/>
  </div>
</template>

<script>
import CreatePostButton from './CreatePostButton.vue';
import EditPostButton from './EditPostButton.vue';
import DeletePostButton from './DeletePostButton.vue';

export default {
  components: {
    CreatePostButton,
    EditPostButton,
    DeletePostButton,
  },
};
</script>
```

As a result, now we have a much cleaner code in `App.vue` since all related logic have been moved to their respective components. We can also keep the `z-index` of the modal because it will be displayed on the `portal-target` tag when the button is clicked.

Indeed, it is kind of weird to have a full blown modal tags inside of a button tag. However, this is only a representation of the component structure, not an actual DOM. By using vue-portal, the entire modal tags are literally moved to the `portal-target` tag once the condition is satisfied so you don't have to worry about it.

## Case 2: Swap content when the route changes

Suppose our app is using [vue-router](https://router.vuejs.org/) and we have a sidebar to navigate. The sidebar content can change depending on the current path. However, the sidebar container need to be placed outside of the `router-view` for styling purpose.

``` js
// routes.js
// import all page components

export default [
  { path: '/', component: HomePage },
  { path: '/product', component: ProductPage },
  { path: '/product/active', component: ProductActivePage },
  { path: '/product/inactive', component: ProductInactivePage },
  { path: '/product/drafted', component: ProductDraftedPage },
  // ....
];
```

``` html
<!-- App.vue -->
<template>
  <div>
    <aside>
      <div v-if="$route.path === '/'">
        <router-link to="/product">Product</router-link>
        <router-link to="/transaction">Transaction</router-link>
      </div>

      <div v-if="$route.path === '/product'">
        <router-link to="/">Back to Home</router-link>
        <router-link to="/product/active">Active products</router-link>
        <router-link to="/product/inactive">Inactive products</router-link>
        <router-link to="/product/drafted">Drafted products</router-link>
      </div>

      <!-- ... -->

    </aside>

    <router-view/>

  </div>
</template>
```

The `App.vue` is full of path checking. To improve it, we can just set a `portal-target` inside of the `aside` tag and move the links into their respective page component.

``` html
<!-- HomePage.vue -->
<template>
  <div>
    <portal to="app">
      <div>
        <router-link to="/product">Product</router-link>
        <router-link to="/transaction">Transaction</router-link>
      </div>
    </portal>
    <!-- and the rest of the component -->
  </div>
</template>

<!-- ProductPage.vue -->
<template>
  <div>
    <portal to="app">
      <div>
        <router-link to="/">Back to Home</router-link>
        <router-link to="/product/active">Active products</router-link>
        <router-link to="/product/inactive">Inactive products</router-link>
        <router-link to="/product/drafted">Drafted products</router-link>
      </div>
    </portal>
    <!-- and the rest of the component -->
  </div>
</template>

<!-- App.vue -->
<template>
  <div>
    <!-- you can set the tag type of portal-target using 'tag' prop -->
    <portal-target name="app" tag="aside"/>
    <router-view/>
  </div>
</template>

```

Because `router-view` already know when to display a page component based on current path, we don't need to make any conditional on our navigation's portal in the page. Again, our `App.vue` becomes much cleaner and the code stays inside its relevant place by using portal.

You may not prefer this approach if there is only one swappable section. However, it will be a clear choice if your app has more than one swappable section.

## Case 3: Distribute contents from a Promise component

I don't know about you, but I really like using [vue-promised](https://github.com/posva/vue-promised). It helps me to not repeatedly create states for every single API request. However, it is not quite pleasant to use if there are multiple parts that depend on the promise's state. That is because the state is only accessible from within the `promised` component (scope slot).

``` html
<!-- App.vue -->
<template>
  <div>
    <div class="breadcrumb">
      <ul>
        <li>Home</li>
        <li>Invoices</li>
      </ul>
    </div>

    <promised :promise="requestInvoice">
      <p v-slot:pending>Loading...</p>

      <div v-slot:data>
        <!-- content of invoice detail -->
      </div>

      <p v-slot:rejected="error">
        There is some errors in our side. Please wait until we fix it.
      </p>
    </promised>
  </div>
</template>
```

Above example works just fine, except one thing. I need to update the breadcrumb when the promised has been resolved. Let's update the code with portal.

``` html
<!-- App.vue -->
<template>
  <div>
    <portal-target class="breadcrumb" name="breadcrumb">
      <ul>
        <li>Home</li>
        <li>Invoices</li>
      </ul>
    </portal-target>

    <promised :promise="requestInvoice">
      <p v-slot:pending>Loading...</p>

      <template v-slot:data>
        <portal to="breadcrumb">
          <ul>
            <li>Home</li>
            <li>Invoices</li>
            <li>{{ data.payment_id }}</li>
          <ul>
        </portal>

        <div>
          <!-- content of invoice detail -->
        </div>
      </template>

      <p v-slot:rejected="error">
        There is some errors in our side. Please wait until we fix it.
      </p>
    </promised>
  </div>
</template>

```

By using a portal, we can distribute contents from within the `promised` component while still keeping the same structure. The `portal-target` slot can be used for placing some default tags which is very handy. Instead of using a plain tags, for certain cases you might want to replace them with a shimmering loader which lets users know that something is being processed.

## Conclusion

Previously, I thought we could only manage an app by juggling structure with parent and child components relationship. Now with portal, we can eliminates that limitation which can expand more possibility to restructure our app without being restricted to the location of components or templates.

