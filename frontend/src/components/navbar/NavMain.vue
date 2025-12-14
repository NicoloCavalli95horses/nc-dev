<template>
  <!-- Radius carosel menu -->
  <RadiusNavBar v-if="['home', ''].includes(route.name) && !is_mobile" :items="items" />
   <!-- Regular top page navbar -->
  <NavBarToggle :items="items" v-else />
</template>

<script setup>
//==================================
// Import
//==================================
import {
  computed,
} from "vue";
import {
  useRoute,
} from "vue-router";
import { is_mobile } from "@/utils/globals";
import router from "@/router/index";

import NavBarToggle from './NavBarToggle.vue';
import RadiusNavBar from './RadiusNavBar.vue';



//==================================
// Consts
//==================================
const route = useRoute();

const items = computed(() => ([
  { id: "home",         route: "",             value: "home",         icon: "#home"     },
  { id: "story",        route: "story",        value: "story",        icon: "#path"     },
  { id: "blog",         route: "blog",         value: "blog",         icon: "#pen"      },
  { id: "projects",     route: "projects",     value: "projects",     icon: "#projects" },
  // { id: "publications", route: "publications", value: "publications", icon: "#book"     },
  { id: "contacts",     route: "contacts",     value: "contacts",     icon: "#phone"    },
]));

</script>

<style lang="scss" scoped>
</style>