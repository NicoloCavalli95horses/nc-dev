<template>
  <BaseLayout>
    <template #title>Editor</template>
    <template #default>
      <div class="main-content">
        <h3 contenteditable ref="title_ref">{{ title || 'This is the title of the article' }}</h3>
        <h4 contenteditable ref="description_ref">{{ description || 'This is a little summary of the article content' }}</h4>
        <div class="tags-wrapper">
          <InputText placeholder="add a tag" v-model:text="tag" :disabled="tags.length == 3" @keydown.enter="addTag" />
          <div v-if="tags.length" class="tags">
            <div class="tag" v-for="(t, i) in tags" :key="t" @click="removeTag(i)">
              <label>{{ t }}</label>
            </div>
          </div>
        </div>
        <div class="article-wrapper">
          <div class="layout article-content" ref="article_ref" contenteditable>{{ content || getDefaultContent }}</div>
          <div class="layout article-preview" v-html="content"></div>
        </div>
        <Btn @click="onUpdatePreview" :def="false">preview</Btn>
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
  nextTick,
  computed,
  onMounted,
} from "vue";
import {
  addToastMsg,
} from "@/utils/globals";
import {
  apiGetArticle,
  apiUpdateArticle,
  apiCreateArticle,
} from "@/utils/api";
import {
  useRoute,
} from "vue-router";
import router from "@/router";

import Btn        from "@/components/Btn.vue";
import InputText  from "@/components/InputText.vue";
import BaseLayout from "@/components/BaseLayout.vue";

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
const title       = ref( undefined );
const description = ref( undefined );
const tags        = ref( [] );
const tag         = ref( undefined );
const content     = ref( undefined );

const title_ref       = ref( undefined );
const article_ref     = ref( undefined );
const description_ref = ref( undefined );

const editID  = computed(() => route.params?.id);
const canSave = computed(() => tags.value.length && content.value );
const getDefaultContent = computed(() => `
<h4>This is the title of the article</h4>
<p>This is a paragraph</p>
<br>
<p>Use the 'br' tag to create a new line</p>
<code>function example() {
  const isValid = false;
  const response = await getData();
  if (response.code == 200) {
    return !isValid
  }
  return isValid;
}
</code>
<br><p>This text is <b>highlighted</b></p>`);

//==============================
// Functions
//==============================
function removeTag(idx) {
  if (tags.value[idx]) {
    tags.value.splice(idx, 1);
  }
}

async function onSave() {
  title.value = title_ref.value.textContent;
  description.value = description_ref.value.textContent;
  if (editID.value) {
    await updateArticle();
  } else {
    await createArticle();
  }
}

async function updateArticle() {
  const res = await apiUpdateArticle({
    id: editID.value,
    title: title.value,
    description: description.value,
    tags: tags.value.toString(),
    content: content.value,
  });
  if (res.code == 200) {
    addToastMsg({ msg: "Article edited", time: 5000 });
  } else {
    addToastMsg({ msg: "Failed to update article", time: 5000 });
  }
  goToBlog();
}

async function createArticle() {
  const res = await apiCreateArticle({
    title: title.value,
    description: description.value,
    tags: tags.value.toString(),
    content: content.value,
  });
  if (res.code == 200) {
    addToastMsg({ msg: "Article saved", time: 5000 });
  } else {
    addToastMsg({ msg: "Failed to save new article", time: 5000 });
  }
  goToBlog();
}

function goToBlog() {
  router.push({ name: "blog" });
}

function addTag() {
  if (tag.value) {
    tags.value.push(tag.value);
    tag.value = undefined;
  }
}

function onUpdatePreview() {
  content.value = article_ref.value.textContent;
}

//==============================
// Life cycle
//==============================
onMounted(async () => {
  if (editID.value) {
    const res = await apiGetArticle({ id: editID.value });
    if (res.code == 200) {
      title.value = res.data.title;
      description.value = res.data.description;
      content.value = res.data.content;
      tags.value = res.data.tags.map(t => t.name);
    }
  } else {
    nextTick(() => onUpdatePreview());
  }
});


</script>

<style lang="scss" scoped>
.main-content {
  display: grid;
  grid-gap: 22px;
  .tags-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px;
    .tags {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 8px;
      justify-content: start;
      cursor: pointer;
    }
  }
  .article-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px;
    height: 45vh;
    .layout {
      overflow-y: scroll;
      padding: 16px 18px;
      box-sizing: border-box;
      background-color: var(--grey-28);
    }
    .article-content {
      font-size: 14px;
      white-space: pre;
    }
  }
  .fixed-btns {
    position: fixed;
    bottom: 22px;
  }
}

</style>
