import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('./views/Home.vue');
const ChapterList = () => import('./views/ChapterList.vue');
const Content = () => import('./views/content.vue');

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/chapter',
      name: 'chapter',
      component: ChapterList,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/content',
      name: 'content',
      component: Content,
      meta: {
        keepAlive: false
      }
    }
  ]
})
