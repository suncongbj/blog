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
      { hid: 'description', name: 'description', content: 'suncong的个人博客' },
      { name:'keywords' , content:'js,html,web,css,node,前端开发,web开发,博客,个人博客' }
    ],
    script: [
      { src: '/js/iconfont.js' },
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
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~plugins/ElementUI',
      ssr: true,
    },{
      src: '~plugins/mixins'
    }
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
