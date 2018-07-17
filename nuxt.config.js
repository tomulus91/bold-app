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
    '@/assets/css/src/main.scss',
    '@/assets/css/src/normalize.scss'
  ],
  plugins: [
    '~/plugins/localforage',
    '~/plugins/VeeValidate'
  ],
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {
    link: [
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'}
    ]
  },
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
