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
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("../views/NotFound.vue"),
    },
  ]
})

export default router
