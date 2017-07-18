import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import store from './store/store'
import LazyRender from 'vue-lazy-render'
import fastclick from 'fastclick'

Vue.use(VueRouter)
Vue.use(LazyRender)

fastclick.attach(document.body)

//可以对单页面设置自动以title 用法详见页面usercenter v-title
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
