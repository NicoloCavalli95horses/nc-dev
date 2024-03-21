<template>
  <BaseLayout :hide_vertical="is_mobile">
    <template #title>Article</template>
    <template #default>
      <template v-if="loading">
        <p>Loading...</p>
      </template>
      <template v-else>
        <BreadCrumbs :title="item.title" />
        <div class="header">
          <div class="date"><p>{{ filterDate(item.updated_at) }}</p></div>
          <div class="tags">
            <div class="tag" v-for="t, i in JSON.parse(item.tags)" :key="i">
              <label>{{ t }}</label>
            </div>
          </div>
        </div>
        <h3>{{ item.title }}</h3>
        <div class="main-content">
          <p id="article-html" v-html="item.content"></p>
        </div>
      </template>
    </template>
  </BaseLayout>
</template>

<script setup>
//==============================
// Import
//==============================
import {
  useRoute,
} from 'vue-router';
import {
  ref,
  nextTick,
  onMounted,
} from 'vue';
import {
  filterDate,
  syntaxHighlighter,
  addToastMsg,
  is_mobile
} from "@/utils/globals";
import { apiGetArticle } from "@/utils/api";

import BaseLayout from "@/components/BaseLayout.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";

//==============================
// Consts
//==============================
const route   = useRoute();
const loading = ref( true );
const error   = ref( false );
const item    = ref( undefined );

//==============================
// Functions
//==============================
async function getArticle() {
  const res = await apiGetArticle({id: route.params.id });
  if (res.code == 200) {
    item.value = res.data;
    loading.value = false;
    error.value = false;
    item.value.content = syntaxHighlighter(item.value.content);
    // appendCopyPaste();
  } else {
    console.error(`error while fetching article ${route.params.id}`);
    loading.value = false;
    error.value = true;
  }
}

// function appendCopyPaste() {
//   nextTick(() => {
//     const codeElements = Array.from(document.querySelectorAll('code'));
//     codeElements.forEach( el => {
//       const textToCopy = el.textContent;
//       const div = document.createElement('div');
//       div.classList.add('copy-paste');
//       div.innerHTML = '<svg><use href="#copy"></use></svg>copy';
//       div.addEventListener('click', () => onClipboardCopy(textToCopy));
//       el.appendChild(div);
//     });
//   })
// }

// function onClipboardCopy(text){
//   navigator.clipboard.writeText(text);
//   addToastMsg({msg: 'Code copied', time:2000})
// }

//==============================
// Life cycle
//==============================
onMounted( async () => {
  await getArticle();
})

</script>


<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
  margin: 0 0 12px 0;
  justify-content: center;
  .tags {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 6px;
    justify-content: end;
    @media screen and (max-width: 550px) {
      justify-content: start;
    }
  }
}

.main-content {
  max-width: 800px;
  margin: 22px 0 44px 0;
  user-select: text;
}
</style>
