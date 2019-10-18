<template lang="pug">
.page-index
  .container
    div
      h1.title
        | sketches
      h2.subtitle
        | p5js (etc) web sketches
      .links 
        template(v-for='item in items')
          a.button--sketch(:href='item.path')
            | {{ item.name }}

</template>

<script>

export default {
  created () {
    this.items = this.$router.options.routes.map(route => ({
      name: route.name
      , path: (this.$router.options.base !== '/' ? this.$router.options.base : '') + route.path
    })).filter(route => route.name !== this.$route.name)
  },
  data () {
    return {
      items: []
    }
  }
}
</script>

<style scoped>
.page-index {
  background-image: linear-gradient(to bottom left, #973999, #f8598b, #f7bf00);
  background-attachment: fixed;
}

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
  color: #7d5cff;;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 14px;
  color: #000;
}

.button--sketch {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--sketch:hover {
  color: #000;
  background-color: #38ef7d;
}
</style>
