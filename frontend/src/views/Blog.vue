<template>
  <BaseLayout :hide_vertical="current_w < 600">
    <template #title>Blog</template>
    <template #default>
      <!-- Filters -->
      <section class="filters-bar">
        <!-- Tags -->
        <div>
          <p>Filter by tag</p>
          <div class="tags">
          <template v-if="tags.length">
            <div class="tag" :class="{'active': active_tags.includes(tag)}" v-for="tag in tags" :key="tag" @click="onTagClick(tag)">
              <label>{{ tag }}</label>
            </div>
          </template>
          <p v-else class="grey-text">No tags</p>
          </div>
        </div>
       <!-- Order by -->
        <div>
          <p>Order by</p>
          <DropDown :items="ORDER_BY_ITEMS" v-model:active_id="sort_by" />
        </div>
        <!-- Sort order -->
        <div v-if="!is_mobile">
          <p>Sort order</p>
          <Btn icon @click="sort_order = !sort_order"  :def="false">
            <svg>
              <use v-if="sort_order" href="#sort-ascending"></use>
              <use v-else href="#sort-descending"></use>
            </svg>
          </Btn>
        </div>
        <!-- Pagination -->
        <div>
        <p>Page</p>
        <Pagination
          :disabled="tot_pages === 1"
          :curr_page="parseInt(curr_page)"
          :tot_pages="parseInt(tot_pages)"
          @page="(n) => curr_page = n"
        />
        </div>
      </section>
      <!-- Articles -->
      <section class="articles" :class="{ 'mobile' : is_mobile }">
          <p v-if="loading">Loading...</p>
          <p v-else-if="error">Unable to fetch articles</p>
          <p v-else-if="!items.length" class="grey-text">0 articles found</p>
        <template v-else>
          <PostSnippet v-for="i in items" :key="i.id" :item="i" @edit="onEdit(i)" @delete="onDelete(i)" />
        </template>
      </section>
    </template>
  </BaseLayout>
</template>

<script setup>
//==============================
// Import
//==============================
import {
  useRouter,
} from 'vue-router';
import router from '@/router/index.js';
import {
  ref,
  watch,
  computed,
  onBeforeMount,
} from "vue";
import {
  apiGetArticles,
  apiDeleteArticle,
  apiGetTags,
} from "@/utils/api";
import {
  is_mobile,
  current_w, 
  addToastMsg,
} from "@/utils/globals";

import Btn         from "@/components/Btn.vue";
import PostSnippet from "@/components/PostSnippet.vue";
import DropDown    from "@/components/DropDown.vue";
import Pagination  from "@/components/Pagination.vue";
import BaseLayout  from "@/components/BaseLayout.vue";

//==============================
// Consts
//==============================
const ORDER_BY_ITEMS = [
  {id: 'title',       val: 'Title'       },
  {id: 'updated_at',  val: 'Update date' },
  {id: 'description', val: 'Description' },
];

//==============================
// Refs
//==============================
const nav = useRouter();
const routerQuery = computed( () => router.currentRoute.value.query );

const items       = ref( [] );
const error       = ref( false );
const loading     = ref( true );
const sort_by     = ref( ORDER_BY_ITEMS[1].id );
const sort_order  = ref( 'asc' );
const curr_page   = ref( 1 );
const tot_pages   = ref( 1 );
const tags        = ref( {} );
const active_tags = ref( routerQuery.value.tags || [] );

const params = computed( () => ({
  page: curr_page.value || 1,
  order: sort_order.value? 'asc' : 'desc',
  sort: sort_by.value,
  ...(active_tags.value.length ? {tags: active_tags.value.toString()} : {})
}));

//==============================
// Functions
//==============================
async function getArticles() {
  const res = await apiGetArticles({params: params.value});
  loading.value = false;
  if (res.code == 200) {
    items.value = [...res.data.data];
    tot_pages.value = res.data.last_page;
    error.value = false;
  } else {
    error.value = true;
  }
}

function onTagClick(tag) {
  if (active_tags.value.includes(tag)) {
    const idx = active_tags.value.indexOf(tag);
    active_tags.value.splice(idx, 1);
  } else {
    active_tags.value.push(tag);
  }
}

function onEdit(i){
  nav.push( {name: 'update', params: { id: i.id }} );
}

async function onDelete(i) {
  const res = await apiDeleteArticle({id:i.id});
  if ( res.code === 200 ) {
    addToastMsg({ msg: 'Article deleted', time: 5000 }),
    await getArticles();
    await getTags();
  } else {
    addToastMsg({ msg: 'Failed to delete article', time: 5000 }); 
  }
}

async function getTags() {
  const res = await apiGetTags();
  if ( res.code === 200 ) {
    tags.value = res.data.map(i => i.name);
  } else {
    addToastMsg({ msg: 'Failed to fetch tags', time: 5000 }); 
  }
}

function initFilters() {
  if (Object.keys(routerQuery.value).length) {
    sort_by.value = routerQuery.value.sort || ORDER_BY_ITEMS[1].id;
    sort_order.value = routerQuery.value.order || 'asc';
    curr_page.value = routerQuery.value.page || 1;
    active_tags.value = routerQuery.value.tags?.split(',') || [];
  } else {
    nav.push( {query: { ...params.value }} );
  }
}

//==============================
// Watch
//==============================
watch( params, async (newParams) => {
  loading.value = true;
  nav.push( {query: { ...newParams }} )
  await getArticles();
});


//==============================
// Life cycle
//==============================
onBeforeMount( async () => {
  await getTags();
  initFilters();
  await getArticles();
});


</script>

<style lang="scss" scoped>
.filters-bar {
  display: grid;
  grid-gap: 10px;
  margin: 18px 0 48px 0;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  .tags {
    display: flex;
    flex-wrap: wrap;
    .tag {
      cursor: pointer;
      margin: 2px;
      &.active {
        background-color: var(--grey-44);
      }
      label {
        cursor: pointer;
      }
      label .freq {
        color: var(--font-light);
      }
    }
  }
}
.articles {
  display: grid;
  grid-gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  padding: 10px;
  &.mobile {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
