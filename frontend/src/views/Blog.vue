<template>
  <BaseLayout>
    <template #title>Blog</template>
    <template #default>
      <div class="bottom-48">
        <h2>
          Sharing is the best way to learn.<br />
          That's why I decided to keep track of my progresses building a li'l blog
          from scratch
        </h2>
        <div class="filters-bar">
          <div>
            <p>Order by</p>
            <DropDown :items="ORDER_BY_ITEMS" v-model:active_id="sort_by" />
          </div>
          <div>
            <p>Sort order</p>
            <DropDown :items="SORT_ORDER_ITEMS" v-model:active_id="sort_order" />
          </div>
        </div>
      </div>
      <div class="articles" :class="{ 'mobile' : is_mobile }">
        <template v-if="loading">
          <p>Loading...</p>
        </template>
        <template v-else-if="error">
          <p><b>Impossible to fetch articles</b></p>
        </template>
        <template v-else>
          <Preview v-for="i in items" :key="i.id" :item="i" @edit="onEdit(i)" @delete="onDelete(i)" />
        </template>
      </div>
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
import {
  ref,
  watch,
  computed,
} from "vue";
import {
  apiGetArticles,
  apiDeleteArticle,
} from "@/utils/api";
import {
  is_mobile,
  addToastMsg,
} from "@/utils/globals";

import Preview    from "@/components/Preview.vue";
import DropDown    from "@/components/DropDown.vue";
import BaseLayout from "@/components/BaseLayout.vue";

//==============================
// Consts
//==============================
const ORDER_BY_ITEMS = [
  {id: 'updated_at',  val: 'Updated at' },
  {id: 'created_at',  val: 'Created at' },
  {id: 'title',       val: 'Title'      },
  {id: 'description', val: 'Description'},
];
const SORT_ORDER_ITEMS = [
  {id: 'desc', val: 'Descending'},
  {id: 'asc',  val: 'Ascending' },
];

const router      = useRouter();
const items       = ref( [] );
const error       = ref( false );
const loading     = ref( true );
const sort_by     = ref( 'title' || ORDER_BY_ITEMS[0].id );
const sort_order  = ref( 'desc' || SORT_ORDER_ITEMS[0].id );
const filter_tags = ref( [] );

const params = computed( () => {
  return { 
    sort: sort_by.value,
    order: sort_order.value,
    ...(filter_tags.value.length ? {tags: filter_tags.value.join(',')} : {})
  };
})

//==============================
// Functions
//==============================
async function getArticles() {
  const res = await apiGetArticles({params: params.value});
  loading.value = false;
  if (res.code == 200) {
    items.value = [...res.data];
    error.value = false;
  } else {
    error.value = true;
  }
}

function onEdit(i){
  router.push({
    name: 'update',
    params: { id: i.id }
  });
}

async function onDelete(i) {
  const res = await apiDeleteArticle({id:i.id});
  if ( res.code == 200 ) {
    addToastMsg({ msg: 'Article deleted', time: 5000 }),
    await getArticles();
  } else {
    addToastMsg({ msg: 'Failed to delete article', time: 5000 }); 
  }
}

//==============================
// Watch
//==============================
watch( params, async (newParams) => {
  loading.value = true;
  router.push({ query: { ...newParams }})
  await getArticles();
}, { immediate: true });


</script>

<style lang="scss" scoped>
.filters-bar {
  display: grid;
  grid-gap: 10px;
  margin-top: 18px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.articles {
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  &.mobile {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
