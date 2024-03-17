<template>
  <BaseLayout>
    <template #title>Blog</template>
    <template #default>
      <h2 class="bottom-48">
        Sharing is the best way to learn.<br />
        That's why I decided to keep track of my progresses building a li'l blog
        from scratch
      </h2>
      <div class="articles" :class="{ 'mobile' : is_mobile }">
        <template v-if="items.length">
          <Preview v-for="i in items" :key="i.id" :item="i" @edit="onEdit(i)" @delete="onDelete(i)" />
        </template>
        <p v-else-if="error"><b>Impossible to fetch articles</b></p>
        <p v-else>Loading...</p>
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
  onMounted,
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
import BaseLayout from "@/components/BaseLayout.vue";

//==============================
// Consts
//==============================
const router = useRouter();
const items  = ref([]);
const error  = ref(false);

//==============================
// Functions
//==============================
async function getArticles() {
  const res = await apiGetArticles();
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
// Life cycle
//==============================
onMounted(async () => {
  await getArticles();
});

</script>

<style lang="scss" scoped>
.articles {
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  &.mobile {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
