//===========================
// Import
//===========================
import {
  createRouter,
  createWebHistory,
} from 'vue-router';


//===========================
// Consts
//===========================
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/education',
      name: 'education',
      component: () => import('../views/Education.vue')
    },
    {
      path: '/experience',
      name: 'experience',
      component: () => import('../views/Experience.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/Projects.vue')
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/Contacts.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("../views/NotFound.vue"),
    },
  ]
})

export default router
