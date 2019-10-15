<template lang="pug">
.container
  #p5Canvas.d-flex.justify-content-center

</template>

<script>
import Sketch from '../components/word-pond'
import TextManager from '../components/text-manager'
import text from '../components/poem.js'

export default {
  components: {
  },
  mounted () {
    const P5 = require('p5');
    const tm = new TextManager(text)

    const size = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    const builder = (p) => {
      new Sketch(p, P5, tm, size) // eslint-disable-line no-new
    }

    new P5(builder) // eslint-disable-line no-new
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
