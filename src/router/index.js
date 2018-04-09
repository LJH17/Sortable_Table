import Vue from 'vue'
import Router from 'vue-router'
import Table from '@/components/Table'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Table',
      component: Table
    },
    { path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})
