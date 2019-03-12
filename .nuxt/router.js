import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _3c76fee0 = () => interopDefault(import('../pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _331c3b93 = () => interopDefault(import('../pages/detail/index.vue' /* webpackChunkName: "pages/detail/index" */))
const _46522af9 = () => interopDefault(import('../pages/template.vue' /* webpackChunkName: "pages/template" */))
const _0b07aae3 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/admin",
      component: _3c76fee0,
      name: "admin"
    }, {
      path: "/detail",
      component: _331c3b93,
      name: "detail"
    }, {
      path: "/template",
      component: _46522af9,
      name: "template"
    }, {
      path: "/",
      component: _0b07aae3,
      name: "index"
    }],

    fallback: false
  })
}
