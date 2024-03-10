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
          <div v-html="item.content" id="article-html" />
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
  onMounted,
  ref,
} from 'vue';

import { filterDate } from "@/utils/globals";
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
  margin: 22px 0 44px 0;
  user-select: text;
}
</style>
