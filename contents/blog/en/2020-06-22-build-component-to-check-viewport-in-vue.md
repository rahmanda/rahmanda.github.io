---
title: Building a Component to Check Viewport in Vue
slug: building-component-to-check-viewport-in-vue
published_date: 2020-06-22
language: en
type: blog
---

Sometimes we need to check viewport via JS to complement CSS media queries for building a responsive web design. In this article, I will explain how to implement it as a component to gain the benefit of reusability and declarative usage in a template.

## Design the API

Let's say that we want to use the viewport value from a slot scope. Below is the rough idea of how we would use it on template.

``` html
<template>
  <Viewport>
    <template v-slot:default="{ value }">
      <div v-if="value > 1280">
        <!-- content to display -->
      </div>
      <div v-else>
        <!-- content to fallback -->
      </div>
    </template>
  </Viewport>
</template>
```

In this component, we only use the default slot to provide the viewport value. The `value` prop needs to be updated every time a user resize a screen, thus we will require a resize event listener which will keep track of `value` in the component.

## Implementation

We will create a state to hold the viewport value and return it as a slot prop. The code will look something like this:

``` html
<script>
export default {
  data() {
    return {
      value: 0
    }
  },
  render() {
    // return the state as slot props
    return this.$scopedSlots.default({
      value: this.value
    })
  }
}
</script>
```

Now we need to set the initial value of the state on mounted lifecycle.

``` html
<script>
export default {
  data() {
    return {
      value: 0
    }
  },
  // set the initial value
  mounted() {
    this.value = window.innerWidth
  },
  // ...
}
</script>
```

Because we want the `value` state to change every time a user resize the screen, we need to set up an event listener like below.

``` html
<script>
export default {
  data() {
    return {
      value: 0
    }
  },
  mounted() {
    // we create a methods for this part so that
    // we can reuse it inside of the listener
    this.setValue()
    this.setListener()
  },
  methods: {
    setValue() {
      this.value = window.innerWidth
    },
    setListener() {
      let timeout
      // because resizing event can be quite an intensive process
      // we use requestAnimationFrame so that it won't block the browser's rendering cycle
      window.addEventListener('resize', () => {
        if (timeout) {
          window.cancelAnimationFrame(timeout)
        }
        timeout = window.requestAnimationFrame(() => {
          this.setValue()
        })
      })
    }
  }
  // ...
}
</script>

```

And that's it!

## Adding the breakpoint functionality

Instead of manually checking the viewport value from the component, we can also add a breakpoint functionality in the component so that we don't have to add magic numbers or import the breakpoint config from our CSS framework to the template. Thus, the usage will look like this:

``` html
<template>
  <Viewport>
    <template v-slot:default="{ breakpoint }">
      <div v-if="breakpoint === 'lg'">
        <!-- content to display on larger screen -->
      </div>
      <div v-else>
        <!-- content to display on smaller screen -->
      </div>
    </template>
  </Viewport>
</template>
```

To add the breakpoint functionality, we need to introduce a new state called `breakpoint`, and the state will change according to the `value` state. We will make use of watcher to track the `value` state and trigger a method to change the breakpoint.

``` html
<script>
export default {
  data() {
    return {
      value: 0,
      // add a new state
      breakpoint: ''
    }
  },
  // add watcher for value
  watch: {
    value: {
      // need to set immediate as true to trigger the handler
      // immediately after the start of the observation
      immediate: true,
      handler: 'setBreakpoint'
    }
  },
  // ...
  methods: {
    // ...
    // I use small-to-large screen approach here
    // but you can change the logic however you like it
    setBreakpoint(value) {
      let breakpoint = 'xs'

      if (value >= 576) {
        breakpoint = 'sm'
      } else if (value >= 756) {
        breakpoint = 'md'
      } else if (value >= 1024) {
        breakpoint = 'lg'
      } else if (value >= 1280) {
        breakpoint = 'xl'
      }

      this.breakpoint = breakpoint
    }
  },
  render() {
    return this.$scopedSlots.default({
      value: this.value,
      // return the breakpoint state as slot props
      breakpoint: this.breakpoint
    })
  }
}
</script>
```

Finally, the complete code will look like this.

``` html
<script>
export default {
  data() {
    return {
      value: 0,
      breakpoint: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: 'setBreakpoint'
    }
  },
  mounted() {
    this.setValue()
    this.setListener()
  },
  methods: {
    setValue() {
      this.value = window.innerWidth
    },
    setListener() {
      let timeout
      window.addEventListener('resize', () => {
        if (timeout) {
          window.cancelAnimationFrame(timeout)
        }
        timeout = window.requestAnimationFrame(() => {
          this.setValue()
        })
      })
    },
    setBreakpoint(value) {
      let breakpoint = 'xs'

      if (value >= 576) {
        breakpoint = 'sm'
      } else if (value >= 756) {
        breakpoint = 'md'
      } else if (value >= 1024) {
        breakpoint = 'lg'
      } else if (value >= 1280) {
        breakpoint = 'xl'
      }

      this.breakpoint = breakpoint
    }
  },
  render() {
    return this.$scopedSlots.default({
      value: this.value,
      breakpoint: this.breakpoint
    })
  }
}
</script>
```

And that's pretty much it!

