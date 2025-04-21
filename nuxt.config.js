import opn from 'opn'

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = {
  router: {
    base: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/sketches/' : ''
  }
}

const config = {
  ...routerBase,
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // Add the p5 plugin and specify client-side mode
    { src: '~/plugins/p5.client.js', mode: 'client' } // Or use ssr: false
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module'],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  hooks: {
    listen (server, { host, port }) {
      opn(`http://${host}:${port}`)
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
      // Find and remove the previous rule if it exists to avoid duplicates
      // This is safer if you run this multiple times
      const audioRuleIndex = config.module.rules.findIndex(
        rule => rule.test && rule.test.toString().includes('wav')
      )
      if (audioRuleIndex !== -1) {
        config.module.rules.splice(audioRuleIndex, 1)
      }

      // Add rule for audio files using file-loader (for Webpack 4 / Nuxt 2)
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i, // Match common audio formats
        loader: 'file-loader', // Use file-loader
        options: {
          // Define output path structure and naming convention
          // This corresponds to the 'generator.filename' in Webpack 5
          name: 'audio/[name].[hash:7].[ext]'
        }
      })

      // Add rule for image files using file-loader (if you haven't already)
      // Example: You'll need this for the Mona Lisa image import too
      const imageRuleIndex = config.module.rules.findIndex(
        rule => rule.test && rule.test.toString().includes('png|jpe?g|gif|svg')
      )
      if (imageRuleIndex !== -1) {
        // Nuxt often adds its own image rule. You might need to adjust it
        // or ensure this one doesn't conflict. For simplicity, let's add ours.
        // If you get errors about multiple rules for images, you might need
        // to modify Nuxt's default rule instead of adding a new one.
      } else {
        config.module.rules.push({
          test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:7].[ext]'
          }
        })
      }
    }
  }
}

console.log(JSON.stringify(config))

export default config
