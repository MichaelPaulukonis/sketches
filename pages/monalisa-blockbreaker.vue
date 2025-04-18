<template lang="pug">
.container
  #p5Canvas.d-flex.justify-content-center
</template>

<script>
// import p5 from 'p5'
import MonaBlocksSketch from '@/components/mona-blocks.js'

// --- Resolve the image path ---
// Nuxt 2 / Webpack: Use require()
const imageUrl = require('@/assets/mona-blocks/mona-lisa-768x1000.png')
console.log(imageUrl)

export default {
  data () {
    return {
      p5Instance: null
    }
  },
  mounted () {
    const p5 = require('p5')
    // Ensure the container exists
    const container = document.getElementById('p5Canvas')
    if (!container) {
      console.error('p5Canvas not found!')
      return
    }

    const sketchConfig = {
      size: { width: container.clientWidth | 400, height: container.clientHeight || 600 },
      imageUrl // Pass the resolved URL here
    }

    this.p5Instance = new p5((p) => { // eslint-disable-line new-cap
      sketchConfig.p5Instance = p
      new MonaBlocksSketch(sketchConfig) // eslint-disable-line no-new
    }, container)
  },
  beforeDestroy () {
    // Clean up p5 instance
    if (this.p5Instance) {
      this.p5Instance.remove()
    }
  }
  // Add methods for handling resize, etc., if needed
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
