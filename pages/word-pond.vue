<template lang="pug">
.container
  #p5Canvas.d-flex.justify-content-center

</template>

<script>
import Sketch from '@/components/word-pond'
import TextManager from '@/assets/javascript/text-manager'
import poem from '@/assets/javascript/poem.js'
import randomPost from '@/assets/javascript/tumblr-random.js'

const randElem = arr => arr[Math.floor(Math.random() * arr.length)]

export default {
  components: {
  },
  mounted () {
    const P5 = require('p5')

    const size = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    randomPost()
      .then((corpus) => {
        const builder = (p5Instance) => {
          p5Instance.static = P5
          const text = randElem(corpus)
          const tm = new TextManager({ text, corpus })
          new Sketch({ p5Instance, tm, size, randomPost }) // eslint-disable-line no-new
        }
        new P5(builder) // eslint-disable-line no-new
      })
      .catch((err) => {
        console.log('OH NOES NO POEM!!!')
        console.error(err)
        const builder = (p5Instance) => {
          p5Instance.static = P5
          const tm = new TextManager({ text: poem, corpus: [poem] })
          new Sketch({ p5Instance, tm, size, randomPost }) // eslint-disable-line no-new
        }
        new P5(builder) // eslint-disable-line no-new
      })
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
