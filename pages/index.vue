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
          a.button--sketch(
              :href='item.path'
              :title='item.description'
              :target='item.external ? "_blank" : "_self"'
              :rel='item.external ? "noopener" : ""'
            )
            | {{ item.name }}
      h2#external
        a.linkies(href='http://michaelpaulukonis.github.io') Return home
</template>

<script>

export default {
  data () {
    const pathPrefix = this.$router.options.base !== '/' ? this.$router.options.base : ''
    return {
      items: [
        {
          name: 'dragline',
          path: `${pathPrefix}dragline`,
          description: 'drag them around'
        },
        {
          name: 'word-pond',
          path: `${pathPrefix}word-pond`,
          description: 'Flying words'
        },
        {
          name: 'p5 sketches',
          path: 'https://editor.p5js.org/MichaelPaulukonis/sketches',
          external: true,
          description: 'WIP sketches for p5js (many copied from others!!!)'
        }
      ]
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
  color: #7d5cff;
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

#external {
  margin-top: 50px;
}

.linkies {
  text-decoration: none;
  display: inline-block;
  padding-left: 20px;
  padding: 2px 8px;
  background: #38ef7d;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 14px;
  color: #000;
}

.linkies:hover {
  background: #96ebe1;
  filter: invert(100%);
  -webkit-filter: invert(100%);
}
</style>
