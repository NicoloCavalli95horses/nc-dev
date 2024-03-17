// ==============================
// Import
// ==============================
import "./assets/main.css";

import { createApp } from "vue";
import router        from "./router";
import App           from "./App.vue";
import Icons         from "./components/Icons.vue";
import directives    from "./utils/directives";

// ==============================
// Import
// ==============================
createApp(App)
 .use(router)
 .use(directives)
 .component("Icons", Icons)
 .mount("#app");
