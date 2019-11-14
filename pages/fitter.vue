<template lang="pug">
  #container
    #target

</template>

<script>
import randomPost from '@/assets/javascript/tumblr-random.js'
const fitText = require('FitText-UMD')

const randElem = arr => arr[Math.floor(Math.random() * arr.length)]

export default {
  components: {
  },
  data () {
    return {
      corpus: [],
      text: []
    }
  },
  mounted () {
    randomPost({ cleanText: false })
      .then((corpus) => {
        this.corpus = corpus
        this.text = randElem(this.corpus).split(/\n/g)
        window.setInterval(this.populateTarget, 400)
      })
  },
  methods: {
    populateTarget () {
      const target = document.getElementById('target')
      target.textContent = randElem(this.text)
      fitText(target)
    }
  }
}
</script>

<style lang="scss">
body {
  background: blue;
  color: yellow;
}
#target {
  text-align: center;
  font-family: "Comic Sans MS", "Comic Sans", "TSCu_Comic", "Marker Felt";
}
</style>
