<template lang="pug">
.container
  VueDraggableResizable(
    v-for="(block, i) in blocks"
    v-bind:key="i"
    :resizable="false")
    pre.block {{ block }}

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
      blocks
    }
  },
  mounted () {
    const browserWindowWidth = window.innerWidth
    const browserWindowHeight = window.innerHeight

    const blobs = this.$el.querySelectorAll('pre.block')
    blobs.forEach((blob) => {
      blob.style.position = 'absolute'
      blob.style.top = (((browserWindowHeight - blob.offsetHeight) / 2) + 'px')
      blob.style.left = (((browserWindowWidth - blob.offsetWidth) / 2) + 'px')
    })
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
}
</style>
