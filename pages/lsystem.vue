<template lang="pug">
.container
  #p5Canvas.d-flex.justify-content-center

</template>

<script>
import Sketch from '../components/lsystem'
import TextManager from '@/assets/javascript/text-manager'

const pome = `I have eaten
the plums
that were in
the icebox

and which
you were probably
saving
for breakfast

Forgive me
they were delicious
so sweet
and so cold
`

export default {
  components: {
  },
  mounted () {
    const P5 = require('p5')
    const tm = new TextManager(pome)

    const size = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    const builder = (p5Instance) => {
      p5Instance.static = P5
      new Sketch({ p5: p5Instance, tm, size }) // eslint-disable-line no-new
    }

    new P5(builder) // eslint-disable-line no-new
  }
}
</script>

<style scoped>
.container {
  background: #74ebd5; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #acb6e5,
    #74ebd5
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #acb6e5,
    #74ebd5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
