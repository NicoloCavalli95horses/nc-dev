<template>
  <BaseLayout :hide_vertical="is_mobile">
    <template #title>Article</template>
    <template #default>
      <p v-if="loading">Loading...</p>
      <template v-else>
        <BreadCrumbs class="fixed-top" :title="item.title" />
        <div class="main-content">
          <div class="header">
            <div class="date"><p>{{ filterDate(item.updated_at) }}</p></div>
            <div class="tags">
              <div class="tag" v-for="t in item.tags" :key="t.id">
                <label>{{ t.name }}</label>
              </div>
            </div>
          </div>
          <h3 class="b-24">{{ item.title }}</h3>
          <p id="html-article" v-html="item.content"></p>
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
  is_mobile,
  filterDate,
  addToastMsg,
  syntaxHighlighter,
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
  } else {
    console.error(`error while fetching article ${route.params.id}`);
    loading.value = false;
    error.value = true;
  }
}

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
  margin: 82px auto;
  user-select: text;
  #html-article {
    line-height: 2;
  }
}

.fixed-top {
  position: fixed;
  width: 100%;
  height: 40px;
  background-color: var(--bg-color);
  top: 51px;
  margin-left: -2px;
  @media only screen and (max-width: 500px) {
    top: 79px;
  }
}
</style>
