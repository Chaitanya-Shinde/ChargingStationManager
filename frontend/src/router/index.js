
import ChargerListingView from '@/views/ChargerListingView.vue'
import AuthView from '../views/AuthView.vue'
import HomePageView from '../views/HomePageView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePageView,
    },
    {
      path: '/auth/:mode(login|register)?',
      name: 'Auth',
      component: AuthView,
    },
    {
      path: '/listings',
      name: 'Listings',
      component: ChargerListingView
    }

  ],
})

export default router
