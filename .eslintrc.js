module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    // Use the new parser
    parser: '@babel/eslint-parser',
    // Required for @babel/eslint-parser
    requireConfigFile: false,
    ecmaVersion: 2020, // Or later if needed
    sourceType: 'module'
  },
  extends: [
    // Use the updated Nuxt config
    '@nuxtjs/eslint-config'
    // Add your p5js config back if you still need it
    // 'p5js',
    // It's good practice to explicitly add prettier last if you use it
    // 'prettier' // Uncomment if you use prettier
  ],
  plugins: [
    // 'vue' is usually included by @nuxtjs/eslint-config, but explicitly adding doesn't hurt
    'vue'
  ],
  // Add or override rules here if needed
  rules: {
    // Example: If you had custom rules, keep them here
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
