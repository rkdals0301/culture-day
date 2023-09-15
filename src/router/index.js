import VueRouter from 'vue-router'
import PageName from '@/utils/define/PageName'
import RoutePath from '@/utils/define/RoutePath'

const routes = [
  {
    path: RoutePath.Home,
    redirect: RoutePath.Culture
  },
  {
    path: RoutePath.Culture,
    name: PageName.Culture,
    component: () => import('@/views/culture/Culture')
  }
]

const router = new VueRouter({
  routes
})

export default router