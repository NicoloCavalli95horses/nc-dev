// ==============================
// Import
// ==============================
import { createApp } from "vue";
import "./assets/main.css";
import router from "./router";
import App from "./App.vue";
import Icons from "./components/Icons.vue";

// ==============================
// Import
// ==============================
createApp(App)
 .use(router)
 .component("Icons", Icons)
 .mount("#app");
