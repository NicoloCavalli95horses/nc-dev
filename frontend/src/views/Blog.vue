<template>
  <BaseLayout :hide_vertical="current_w < 600">
    <template #title>Blog</template>
    <template #default>
      <!-- Filters -->
      <section class="filters-bar">
        <!-- Tags -->
        <!-- <div>
          <p>Filter by tag</p>
          <div class="tags">
            <div class="tag" :class="{'active': active_tags.includes(tag)}" v-for="(freq, tag) in tags" :key="tag" @click="onTagClick(tag)">
              <label>{{ tag }} <b class="freq">{{ freq }}</b></label>
            </div>
          </div>
        </div> -->
        <!-- Order by -->
        <div>
          <p>Order by</p>
          <DropDown :items="ORDER_BY_ITEMS" v-model:active_id="sort_by" />
        </div>
        <!-- Sort order -->
        <div>
          <p>Sort order</p>
          <Btn icon @click="sort_order = !sort_order"  :def="false">
            <svg>
              <use v-if="sort_order" href="#sort-ascending"></use>
              <use v-else href="#sort-descending"></use>
            </svg>
          </Btn>
        </div>
      </section>
      <!-- Articles -->
      <section class="articles" :class="{ 'mobile' : is_mobile }">
        <template v-if="loading">
          <p>Loading...</p>
        </template>
        <template v-else-if="error">
          <p>No articles found</p>
        </template>
        <template v-else>
          <Preview v-for="i in items" :key="i.id" :item="i" @edit="onEdit(i)" @delete="onDelete(i)" />
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
import {
  ref,
  watch,
  computed,
  // onBeforeMount,
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

import Btn    from "@/components/Btn.vue";
import Preview    from "@/components/Preview.vue";
import DropDown    from "@/components/DropDown.vue";
import BaseLayout from "@/components/BaseLayout.vue";

//==============================
// Consts
//==============================
const ORDER_BY_ITEMS = [
  {id: 'title',       val: 'Title'      },
  {id: 'updated_at',  val: 'Update date' },
  {id: 'description', val: 'Description'},
];

const router      = useRouter();
const items       = ref( [] );
const error       = ref( false );
const loading     = ref( true );
const sort_by     = ref( ORDER_BY_ITEMS[1].id );
const sort_order  = ref( true );
// const tags        = ref( {} );
// const active_tags = ref( [] );

const params = computed( () => {
  return { 
    sort: sort_by.value,
    order: sort_order.value ? 'desc' : 'asc',
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

// function onTagClick(tag) {
//   if (active_tags.value.includes(tag)) {
//     const idx = active_tags.value.indexOf(tag);
//     active_tags.value.splice(idx, 1);
//   } else {
//     active_tags.value.push(tag);
//   }
// }

function onEdit(i){
  router.push({
    name: 'update',
    params: { id: i.id }
  });
}

async function onDelete(i) {
  const res = await apiDeleteArticle({id:i.id});
  if ( res.code === 200 ) {
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


//==============================
// Life cycle
//==============================
// onBeforeMount( async () => {
  // This works fine, but a solution has to be found to improve the backend search for all the tags
  // const res = await apiGetTags();
  // if ( res.code === 200 ) {
  //   tags.value = res.data;
  // } else {
  //   addToastMsg({ msg: 'Failed to fetch tags', time: 5000 }); 
  // }
// });


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
