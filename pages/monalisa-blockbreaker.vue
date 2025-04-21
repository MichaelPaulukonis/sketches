<template lang="pug">
.container
  #p5Canvas.d-flex.justify-content-center
</template>

<script>
import MonaBlocksSketch from '@/components/mona-blocks.js'

// --- Resolve the image path ---
// Nuxt 2 / Webpack: Use require()
const imageUrl = require('@/assets/mona-blocks/mona-lisa-768x1000.png')
const soundUrls = {
  blockHit: require('@/assets/mona-blocks/704260__baggonotes__mug_tap.wav').default,
  paddleHit: require('@/assets/mona-blocks/523702__postrobcore__quick-beep-high-to-low.wav').default,
  ballMiss: require('@/assets/mona-blocks/333785__aceofspadesproduc100__8-bit-failure-sound.wav').default,
  ballLaunch: require('@/assets/mona-blocks/523702__postrobcore__quick-beep-high-to-low.wav').default,
  wallHit: require('@/assets/mona-blocks/523702__postrobcore__quick-beep-high-to-low.wav').default,
  gameStart: require('@/assets/mona-blocks/706744__kevp888__cd_contact_003fx_solar_flare.wav').default,
  gameOver: null,
  pause: null,
  victory: null
}

export default {
  data () {
    return {
      p5Instance: null
    }
  },
  mounted () {
    // Ensure the container exists
    const container = document.getElementById('p5Canvas')
    if (!container) {
      console.error('p5Canvas not found!')
      return
    }

    // Basic check if $p5 was injected (should be, as plugin is client-side)
    if (!this.$p5) {
      console.error('$p5 is not available. Check the p5.client.js plugin registration.')
      return
    }

    const sketchConfig = {
      size: { width: container.clientWidth | 400, height: container.clientHeight || 600 },
      imageUrl, // Pass the resolved URL here
      soundUrls
    }

    this.p5Instance = new this.$p5((p) => {
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
