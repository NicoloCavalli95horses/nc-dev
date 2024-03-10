//===========================
// Import
//===========================
import { createRouter, createWebHistory } from "vue-router";
import { is_admin, addToastMsg } from "../utils/globals";

//===========================
// Consts
//===========================
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/story",
      name: "story",
      component: () => import("../views/Story.vue"),
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("../views/Projects.vue"),
    },
    {
      path: "/contacts",
      name: "contacts",
      component: () => import("../views/Contacts.vue"),
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("../views/Blog.vue"),
    },
    {
      path: "/blog/:id",
      name: "article",
      component: () => import("../views/Article.vue"),
    },
    {
      path: "/editor",
      name: "editor",
      component: () => import("../views/Editor.vue"),
      beforeEnter: (to, from, next) => {
        if (is_admin.value) {
          next();
        } else {
          addToastMsg({ msg: "access denied", time: 5000 });
          next("/");
        }
      },
    },
    {
      path: "/editor/:id",
      name: "update",
      component: () => import("../views/Editor.vue"),
      beforeEnter: (to, from, next) => {
        if (is_admin.value) {
          next();
        } else {
          addToastMsg({ msg: "access denied", time: 5000 });
          next("/");
        }
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

export default router;
