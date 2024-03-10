<template>
  <BaseLayout>
    <template #title>Editor</template>
    <template #default>
      <div class="main-content">
        <div class="left">
          <div class="header">
            <!-- title -->
            <div class="row">
              <h4>Title</h4>
              <InputText placeholder="title" v-model:text="title" />
            </div>
            <!-- tags -->
            <div class="row">
              <h4>Tags</h4>
              <InputText placeholder="tag" v-model:text="tag" :disabled="tags.length == 3" @keydown.enter="addTag" />
            </div>
            <!-- description -->
            <div class="row">
              <h4>Description</h4>
              <InputText placeholder="description" type="textarea" v-model:text="description" />
            </div>
          </div>
          <!-- body -->
          <div class="body">
            <h4>Body</h4>
            <div class="btns">
              <Btn icon :def="is_bold" @click="is_bold = !is_bold"><svg><use href="#format-bold"></use></svg></Btn>
              <Btn icon :def="is_code" @click="is_code = !is_code"><svg><use href="#code"></use></svg></Btn>
              <Btn icon :def="is_list" @click="is_list = !is_list"><svg><use href="#list-dot"></use></svg></Btn>
              <Btn icon @click="content+='<br>'"><svg><use href="#new-line"></use></svg></Btn>
            </div>
            <InputText placeholder="description" type="textarea" v-model:text="content" />
            <Btn class="align-right" :def="false" @click="appendToBody">Append</Btn>
          </div>
        </div>
        <div class="right">
          <h3>{{ title }}</h3>
          <div v-if="tags.length" class="tags">
            <div class="tag" v-for="(t, i) in tags" :key="t" @click="removeTag(i)">
              <label>{{ t }}</label>
            </div>
          </div>
          <h4 class="top-12 bottom-24">{{ description }}</h4>
          <div v-html="body" />
        </div>

        <!-- save -->
        <div class="fixed-btns">
          <Btn @click="onSave" :disabled="!canSave">{{ editID ? 'edit' : 'save new'}}</Btn>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script setup>
//==============================
// Import
//==============================
import {
  ref,
  computed,
  onMounted,
} from "vue";
import {
  useRoute,
} from 'vue-router';
import {
  is_admin,
  addToastMsg,
} from '@/utils/globals';
import {
  apiGetArticle,
  apiUpdateArticle,
  apiCreateArticle,
} from "@/utils/api";

import Btn        from "@/components/Btn.vue";
import InputText  from "@/components/InputText.vue";
import BaseLayout from "@/components/BaseLayout.vue";
import router from "@/router";

//==============================
// Props
//==============================
const props = defineProps({
  article: {
    type: Object,
    default: () => ({}),
  },
});
const route = useRoute();


//==============================
// Consts
//==============================
const title       = ref( '' );
const description = ref( '' );
const body        = ref( '' ); //html content of the article
const tags        = ref( [] );
const tag         = ref( undefined );
const content     = ref( '' );

const is_bold     = ref( false );
const is_code     = ref( false );
const is_list     = ref( false );

const getClass    = computed( () => {
  return is_bold.value ? 'bold'
    : is_code.value ? 'code'
      : is_list.value ? 'list' : '';
})

const canSave = computed(() => title.value && description.value && tags.value.length && body.value.length && is_admin.value );
const editID  = computed(() => route.params?.id );

//==============================
// Functions
//==============================
function removeTag(idx) {
  if (tags.value[idx]) {
    tags.value.splice(idx, 1);
  }
}

function appendToBody() {
  body.value += ' ' + getChunk(getClass.value);
  content.value = '';
  is_bold.value = false;
  is_code.value = false;
}

function getChunk( classStyle ) {
  if ( is_list.value ) {
    return `<ul><li class="${classStyle}">${content.value}</li></ul>`
  } else if ( is_code.value ) {
    return `<div class="${classStyle}">${content.value}</div>`;
  }
  return `<span class="${classStyle}">${content.value}</span>`;
}

async function onSave() {
  if ( !is_admin.value ) { return; }
  if ( editID.value ) {
    await updateArticle();
    return;
  } 
  await createArticle();
}

async function updateArticle() {
  const res = await apiUpdateArticle({
    id: editID.value,
    title: title.value,
    description: description.value,
    tags: tags.value,
    content: body.value,
  });
  if ( res.code == 200 ) {
    addToastMsg({ msg: 'Article edited', time: 5000 });
  } else {
    addToastMsg({ msg: 'Failed to update article', time: 5000 }); 
  }  
  goToBlog();
}

async function createArticle() {
  const res = await apiCreateArticle({
    title: title.value,
    description: description.value,
    tags: tags.value,
    content: body.value,
  });
  if ( res.code == 200 ) {
    addToastMsg({ msg: 'Article saved', time: 5000 });
  } else {
   addToastMsg({ msg: 'Failed to save new article', time: 5000 });
  }
  goToBlog(); 
}

function goToBlog() {
  router.push({name: 'blog'});
}

function addTag() {
  if ( tag.value ) {
    tags.value.push(tag.value);
    tag.value = undefined;
  }
}


//==============================
// Life cycle
//==============================
onMounted( async () => {
  if ( !editID.value ) { return; }
  const res = await apiGetArticle({ id: editID.value });
  if ( res.code == 200 ) {
    title.value = res.data.title;
    description.value = res.data.description;
    content.value = res.data.content;
    tags.value = JSON.parse(res.data.tags);
  }
})

</script>

<style lang="scss" scoped>
.main-content {
  display: grid;
  grid-gap: 22px;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  user-select: text;
  .row {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 6px;
  }
  .left {
    .header {
      display: grid;
      grid-gap: 10px;
      margin: 12px 0 0 0;
    }
    .body {
      margin: 24px 0 0 0;
      display: grid;
      grid-gap: 8px;
      .btns {
        width: max-content;
        display: grid;
        grid-auto-flow: column;
        grid-gap: 8px;
      }
    }
  }
  .right {
    .tags {
      margin: 8px 0 0 0;
      width: max-content;
      display: grid;
      grid-auto-flow: column;
      grid-gap: 5px;
    }
  }
}

.fixed-btns {
  position: fixed;
  bottom: 22px;
}
.align-right {
  justify-self: end;
}
</style>