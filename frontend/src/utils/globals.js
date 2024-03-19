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
  const hh = d.getHours();
  const mm = d.getMinutes();
  return `${day} ${MONTHS[month_idx]} ${year}, ${hh < 10 ? '0'+hh : hh}:${mm < 10 ? '0'+mm : mm}`;
}

export function syntaxHighlighter(text) {
  const keywords = [
    { word: "abstract", color: "#80d8ff" },
    { word: "await", color: "#69f0ae" },
    { word: "boolean", color: "#ff5252" },
    { word: "break", color: "#ea80fc" },
    { word: "byte", color: "#ffb74d" },
    { word: "case", color: "#7b68ee" },
    { word: "catch", color: "#8d6e63" },
    { word: "char", color: "#5f9ea0" },
    { word: "class", color: "#d2691e" },
    { word: "const", color: "#ff7f50" },
    { word: "continue", color: "#6495ed" },
    { word: "debugger", color: "#dc143c" },
    { word: "default", color: "#00ffff" },
    { word: "delete", color: "#ff0000" },
    { word: "do", color: "#008b8b" },
    { word: "double", color: "#b8860b" },
    { word: "else", color: "#a9a9a9" },
    { word: "enum", color: "#006400" },
    { word: "export", color: "#bdb76b" },
    { word: "extends", color: "#8b008b" },
    { word: "false", color: "#556b2f" },
    { word: "final", color: "#ff8c00" },
    { word: "finally", color: "#9932cc" },
    { word: "float", color: "#8b0000" },
    { word: "for", color: "#e9967a" },
    { word: "function", color: "#20b2aa" },
    { word: "goto", color: "#483d8b" },
    { word: "if", color: "#df4f4f" },
    { word: "implements", color: "#00ced1" },
    { word: "import", color: "#9400d3" },
    { word: "in", color: "#ff69b4" },
    { word: "instanceof", color: "#00bfff" },
    { word: "int", color: "#696969" },
    { word: "interface", color: "#1e90ff" },
    { word: "let", color: "#b22222" },
    { word: "long", color: "#228b22" },
    { word: "native", color: "#ff00ff" },
    { word: "new", color: "#ffd700" },
    { word: "null", color: "#daa520" },
    { word: "package", color: "#a9a9a9" },
    { word: "private", color: "#adff2f" },
    { word: "protected", color: "#ff69b4" },
    { word: "public", color: "#cd5c5c" },
    { word: "return", color: "#ee22ff" },
    { word: "short", color: "#f0e68c" },
    { word: "static", color: "#e6e6fa" },
    { word: "super", color: "#7cfc00" },
    { word: "switch", color: "#add8e6" },
    { word: "synchronized", color: "#f08080" },
    { word: "this", color: "#e0ffff" },
    { word: "throw", color: "#fafad2" },
    { word: "throws", color: "#90ee90" },
    { word: "transient", color: "#d3d3d3" },
    { word: "true", color: "#ffb6c1" },
    { word: "try", color: "#ffa07a" },
    { word: "typeof", color: "#20b2aa" },
    { word: "var", color: "#87cefa" },
    { word: "void", color: "#778899" },
    { word: "volatile", color: "#b0c4de" },
    { word: "while", color: "#ffffe0" },
    { word: "with", color: "#00ff00" },
    { word: "yield", color: "#32cd32" },
    // Vue.js specific keywords
    { word: "v-bind", color: "#80e80e" },
    { word: "v-on", color: "#66cdaa" },
    { word: "v-if", color: "#0000cd" },
    { word: "v-else", color: "#ba55d3" },
    { word: "v-else-if", color: "#9370db" },
    { word: "v-for", color: "#3cb371" },
    { word: "v-show", color: "#7b68ee" },
    { word: "v-model", color: "#00fa9a" },
    { word: "v-html", color: "#48d1cc" },
    { word: "v-pre", color: "#c71585" },
    { word: "v-cloak", color: "#f91f70" },
    { word: "v-once", color: "#ffdead" },
    { word: "v-slot", color: "#e0e080" },
    { word: "v-text", color: "#0df0e6" },
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
