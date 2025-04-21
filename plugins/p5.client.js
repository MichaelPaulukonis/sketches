let p5 = null
const initP5 = async () => {
  try {
    // import the p5 and p5-sounds client-side
    p5 = (await import('p5')).default
    window.p5 = p5
    await import('p5/lib/addons/p5.sound')
  } catch (error) {
    console.log(error)
  }
}

// Export the Nuxt plugin function
export default async ({ app }, inject) => {
  // Inject 'p5' into Vue, context, and store ($p5 available in components)
  await initP5()
  inject('p5', p5)
}
