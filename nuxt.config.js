module.exports = {
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'axios',
      'localforage'
    ]
  },
  css: [
    '@/assets/css/src/main.scss'
  ],
  plugins: [
    '~/plugins/localforage'
  ],
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {},
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Customize app manifest
  */
  manifest: {
    theme_color: '#3B8070'
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa'
  ]
}