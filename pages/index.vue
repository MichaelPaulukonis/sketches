<template lang="pug">
.container
  div
    h1.title
      | sketches
    h2.subtitle
      | p5js (etc) web sketches
    .links
      template(v-for='item in items')
        a.button--green(:href='item.path')
          | {{item.name}}

</template>

<script>

export default {
  created () {
    this.items = this.$router.options.routes.map(route => ({
        name: route.name
        , path: route.path
    })).filter(route => route.name !== this.$route.name)
  },
  data () {
    return {
      items: []
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
