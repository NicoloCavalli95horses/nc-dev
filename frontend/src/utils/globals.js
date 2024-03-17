//==================================
// Import
//==================================
import { ref, watch } from "vue";

//==================================
// Consts
//==================================
const MOBILE_W = 500;
const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

export const toastMsg = ref([]);
export const is_mobile = ref(window.innerWidth <= MOBILE_W);
export const is_admin = ref(false);

window.addEventListener(
  "resize",
  () => (is_mobile.value = window.innerWidth <= MOBILE_W)
);

//==================================
// Functions
//==================================
export function addToastMsg({ msg, time = 1000 }) {
  const id = Date.now() + "" + Math.random() * 100;
  toastMsg.value.push({ id, msg, time });
}

export function filterDate(date) {
  const d = new Date(date);
  const day = d.getDate();
  const month_idx = d.getMonth();
  const year = d.getFullYear();
  return `${day} ${MONTHS[month_idx]} ${year}`;
}

export function syntaxHighlighter(text) {
  const keywords = [
    { word: "abstract", color: "blue" },
    { word: "await", color: "green" },
    { word: "boolean", color: "red" },
    { word: "break", color: "purple" },
    { word: "byte", color: "orange" },
    { word: "case", color: "blueviolet" },
    { word: "catch", color: "brown" },
    { word: "char", color: "cadetblue" },
    { word: "class", color: "chocolate" },
    { word: "const", color: "coral" },
    { word: "continue", color: "cornflowerblue" },
    { word: "debugger", color: "crimson" },
    { word: "default", color: "cyan" },
    { word: "delete", color: "darkblue" },
    { word: "do", color: "darkcyan" },
    { word: "double", color: "darkgoldenrod" },
    { word: "else", color: "darkgray" },
    { word: "enum", color: "darkgreen" },
    { word: "export", color: "darkkhaki" },
    { word: "extends", color: "darkmagenta" },
    { word: "false", color: "darkolivegreen" },
    { word: "final", color: "darkorange" },
    { word: "finally", color: "darkorchid" },
    { word: "float", color: "darkred" },
    { word: "for", color: "darksalmon" },
    { word: "function", color: "darkseagreen" },
    { word: "goto", color: "darkslateblue" },
    { word: "if", color: "darkslategray" },
    { word: "implements", color: "darkturquoise" },
    { word: "import", color: "darkviolet" },
    { word: "in", color: "deeppink" },
    { word: "instanceof", color: "deepskyblue" },
    { word: "int", color: "dimgray" },
    { word: "interface", color: "dodgerblue" },
    { word: "let", color: "firebrick" },
    { word: "long", color: "forestgreen" },
    { word: "native", color: "fuchsia" },
    { word: "new", color: "gold" },
    { word: "null", color: "goldenrod" },
    { word: "package", color: "gray" },
    { word: "private", color: "greenyellow" },
    { word: "protected", color: "hotpink" },
    { word: "public", color: "indianred" },
    { word: "return", color: "indigo" },
    { word: "short", color: "khaki" },
    { word: "static", color: "lavender" },
    { word: "super", color: "lawngreen" },
    { word: "switch", color: "lightblue" },
    { word: "synchronized", color: "lightcoral" },
    { word: "this", color: "lightcyan" },
    { word: "throw", color: "lightgoldenrodyellow" },
    { word: "throws", color: "lightgreen" },
    { word: "transient", color: "lightgrey" },
    { word: "true", color: "lightpink" },
    { word: "try", color: "lightsalmon" },
    { word: "typeof", color: "lightseagreen" },
    { word: "var", color: "lightskyblue" },
    { word: "void", color: "lightslategray" },
    { word: "volatile", color: "lightsteelblue" },
    { word: "while", color: "lightyellow" },
    { word: "with", color: "lime" },
    { word: "yield", color: "limegreen" },
    // Vue.js specific keywords
    { word: "v-bind", color: "maroon" },
    { word: "v-on", color: "mediumaquamarine" },
    { word: "v-if", color: "mediumblue" },
    { word: "v-else", color: "mediumorchid" },
    { word: "v-else-if", color: "mediumpurple" },
    { word: "v-for", color: "mediumseagreen" },
    { word: "v-show", color: "mediumslateblue" },
    { word: "v-model", color: "mediumspringgreen" },
    { word: "v-html", color: "mediumturquoise" },
    { word: "v-pre", color: "mediumvioletred" },
    { word: "v-cloak", color: "midnightblue" },
    { word: "v-once", color: "navajowhite" },
    { word: "v-slot", color: "navy" },
    { word: "v-text", color: "oldlace" },
  ];
  const codeTagPattern = /<code>([\s\S]*?)<\/code>/g;
  const highlightKeywords = (match) => {
    keywords.forEach((keyword) => {
      const regex = new RegExp("\\b(" + keyword.word + ")\\b", "g");
      match = match.replace(
        regex,
        '<span style="color: ' + keyword.color + ';">$1</span>'
      );
    });
    return match;
  };
  const highlightedText = text.replace(codeTagPattern, highlightKeywords);
  return highlightedText;
}

//==================================
// Watchers
//==================================
watch(is_admin, (newVal) => {
  if (newVal) {
    addToastMsg({ msg: "admin mode", time: 5000 });
  }
});
