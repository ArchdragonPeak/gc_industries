import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DiscoverView from '../views/DiscoverView.vue'
import GameView from '../views/GameView.vue'
import LibraryView from '../views/LibraryView.vue'
import ProfileView from '../views/ProfileView.vue'
import AddGameView from '../views/AddGameView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/discover',
    name: 'discover',
    component: DiscoverView
  },
  {
    path: '/game/:id',
    name: 'game',
    component: GameView
  },
  {
    path: '/library',
    name: 'library',
    component: LibraryView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/addgame',
    name: 'addgame',
    component: AddGameView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
