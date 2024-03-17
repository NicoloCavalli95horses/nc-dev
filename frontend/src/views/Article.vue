<template>
  <BaseLayout>
    <template #title>Article</template>
    <template #default>
      <div class="breadcrumbs">
        <p @click="$router.push({ path: '/blog' })">Blog</p>
        <span>&gt;</span>
        <p v-if="item?.title" class="active">{{ item.title}}</p>
      </div>
      <template v-if="loading"><p>loading...</p></template>
      <template v-else>
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
  nextTick,
  onMounted,
  ref,
} from 'vue';

import { filterDate, syntaxHighlighter, addToastMsg } from "@/utils/globals";
import { apiGetArticle } from "@/utils/api";
import BaseLayout from "@/components/BaseLayout.vue";

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
    appendCopyPaste();
  } else {
    console.error(`error while fetching article ${route.params.id}`);
    loading.value = false;
    error.value = true;
  }
}

function appendCopyPaste() {
  nextTick(() => {
    const codeElements = Array.from(document.querySelectorAll('code'));
    codeElements.forEach( el => {
      const textToCopy = el.textContent;
      const div = document.createElement('div');
      const svg = document.createElement('svg');
      const use = document.createElement('use');
      use.setAttribute('href', '#copy');
      svg.appendChild(use);
      div.appendChild(svg);
      div.classList.add('copy-paste');
      div.textContent = 'copy';
      div.addEventListener('click', () => onClipboardCopy(textToCopy));
      el.appendChild(div);
    });
  })
}

function onClipboardCopy(text){
  navigator.clipboard.writeText(text);
  addToastMsg({msg: 'Code copied', time:2000})
}

//==============================
// Life cycle
//==============================
onMounted( async () => {
  await getArticle();
})

</script>

<style lang="scss" scoped>
.breadcrumbs {
  position: sticky;
  display: flex;
  align-items: center;
  margin: 0 0 24px 0;
  padding: 12px 0;
  border-bottom: 1px solid var(--grey-33);
  p {
    cursor: pointer;
    &.active {
      color: var(--primary);
    }
  }
  span {
    margin: 0 12px;
  }
}

.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 12px 0;
  .tags {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 6px;
  }
}

.main-content {
  max-width: 800px;
  margin: 22px 0 44px 0;
  user-select: text;
}
</style>
