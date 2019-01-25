const pkg = require('./package')

module.exports = {
  mode: 'universal',

  server: {
    port: 3001, // default: 3000
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: '博客,个人博客,技术,技术博客,技术分享' },
      { name:'keywords' , content:'js,html,web,css,node,前端开发,web开发' }
    ],
    script: [
      { src: '/js/iconfont.js' },
      { src: '//unpkg.com/wangeditor/release/wangEditor.min.js'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/global.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    },
    postcss:[require('autoprefixer')({ browsers: [
      'Android > 4.4',
      "iOS >= 8",
      "> 1%",
      "last 7 versions"
    ]})]
  }
}
