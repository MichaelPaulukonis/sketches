<template lang="pug">
.container
  VueDraggableResizable(
    v-for="(block, i) in blocks"
    :key="i"
    :id="'block-' + i"
    :grid=[18,18]
    :resizable="false")
    .block {{ block }}

</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import blocks from '@/assets/text/drag-blocks'

export default {
  components: {
    VueDraggableResizable
  },
  data () {
    return {
      blocks: blocks.map(b => b.replace(/ /g, '\xA0')) // non-breaking space in Javascript (not html-char-entity)
    }
  },
  mounted () {
    const browserWindowWidth = window.innerWidth
    const browserWindowHeight = window.innerHeight

    const blobs = this.$el.querySelectorAll('.block')
    blobs.forEach((blob) => {
      blob.style.position = 'absolute'
      blob.style.top = (((browserWindowHeight - blob.offsetHeight) / 2) + 'px')
      blob.style.left = (((browserWindowWidth - blob.offsetWidth) / 2) + 'px')
    })
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Overpass+Mono");

.container {
  font-family: "Overpass Mono";
  font-weight: regular;
  height: 100vh;
  width: 100vw;
  background: #fceabb; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f8b500,
    #fceabb
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f8b500,
    #fceabb
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.block {
  font-family: "Overpass Mono", monospace;
  font-size: 16px;
  line-height: 16px;
}
</style>
