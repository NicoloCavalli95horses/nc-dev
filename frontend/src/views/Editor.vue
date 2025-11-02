<template>
  <BaseLayout>
    <template #title>Editor</template>
    <template #default>
      <div class="main-content">
        <!-- Title -->
        <h3 contenteditable ref="title_ref" v-html="title" />
        
        <!-- Summary -->
        <h4 contenteditable ref="description_ref" v-html="description" />
        
        <!-- Tags -->
        <div class="tags-wrapper">
          <InputText placeholder="add a tag" v-model:text="tag" :disabled="tags.length == 3" @keydown.enter="addTag" />
          <div v-if="tags.length" class="tags">
            <div class="tag" v-for="(t, i) in tags" :key="t" @click="removeTag(i)">
              <label>{{ t }}</label>
            </div>
          </div>
        </div>

        <!-- Article -->
        <div contenteditable ref="content_ref" v-html="content" class="article" />

        <!-- Helpers -->
        <div class="helpers-btns">
          <Btn :icon="true" @click="appendContent('p', 'New paragraph')"><svg><use href="#paragraph"></use></svg></Btn>
          <Btn :icon="true" @click="appendContent('a', 'New link')"><svg><use href="#link"></use></svg></Btn>
          <Btn :icon="true" @click="appendContent('code')"><svg><use href="#code"></use></svg></Btn>
        </div>

        <!-- Save button -->
        <div class="fixed-btns">
          <Btn @click="onDraft" :disabled="!canSave" :def="false">Save draft</Btn>
          <Btn @click="onSave" :disabled="!canSave">{{ editID ? 'update' : 'create new'}}</Btn>
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
const content     = ref( undefined );
const tags        = ref( [] );
const tag         = ref( undefined );

const title_ref       = ref( undefined );
const description_ref = ref( undefined );
const content_ref     = ref( undefined );



const editID  = computed(() => route.params?.id);
const canSave = computed(() => tags.value.length && content.value );
const body    = computed(() => ({
  id: editID.value,
  title: title_ref.value.textContent,
  description:  description_ref.value.textContent,
  tags: tags.value.toString(),
  content: content_ref.value.innerHTML, // keep the HTML tags
}));

const CONTENT_EXAMPLE = `
  <h4>This is a title</h4>
  <br><br>
  <p>This is a paragraph example</p>
  <p>Supported text format: <i>italic</i>, <b>bold</b>, <u>underline</u></p>
  <p>Press Enter to create a new line (it will add a br tag)</p>
`;


//==============================
// Functions
//==============================

async function onSave() {
  const isEdit = body.value.id;
  const res = isEdit ? await apiUpdateArticle(body.value) : await apiCreateArticle(body.value);

  if (res.code == 200) {
    addToastMsg({ msg: `Article ${isEdit ? 'edited' : 'saved'}. Local draft removed`, time: 5000 });
    localStorage.removeItem('draft');
  } else {
    addToastMsg({ msg: `Failed to ${isEdit ? 'edit' : 'save new'} article`, time: 5000 });
  }
  
  router.push({ name: "blog" });
}


function appendContent(tag, str) {
  content.value = content_ref.value.innerHTML; // keep the HTML tags

  switch (tag) {
    case "p":
      content.value += `<${tag}>${str}</${tag}>`;
      break;
  
    case "a":
      const href = window.prompt("Insert a valid URL") || "http://www.example.com";
      content.value += `<${tag} style="text-decoration:underline" href="${href}">${str}</${tag}>`;
      break;
    
    case "code":
      content.value += `<${tag}>function example() { ... }</${tag}>`;
      break;
  }
}


function addTag() {
  if (tag.value) {
    tags.value.push(tag.value);
    tag.value = undefined;
  }
}

function removeTag(idx) {
  if (tags.value[idx]) {
    tags.value.splice(idx, 1);
  }
}

function onDraft() {
  addToastMsg({ msg: `${JSON.parse(localStorage.getItem('draft')) ? 'Updated' : 'New draft saved'}`, time: 5000 });
  localStorage.setItem('draft', JSON.stringify(body.value));
}


//==============================
// Life cycle
//==============================
onMounted(async () => {
  if (!editID.value) { 
    const draft = JSON.parse(localStorage.getItem('draft'));
    title.value = draft?.title || "This is a title";
    description.value = draft?.description || "This is a description example";
    const draftTags = draft?.tags?.split(',');
    tags.value = draftTags?.length ? draftTags : ["test"];
    content.value = draft?.content || CONTENT_EXAMPLE;
    return;
  }

  // Updating an existing article
  const res = await apiGetArticle({ id: editID.value });
  if (res?.code == 200) {
    title.value = res.data.title;
    description.value = res.data.description;
    content.value = res.data.content;
    tags.value = res.data.tags.map(t => t.name);
  }
});


</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  flex-direction: column;
  gap: 22px;
  .tags-wrapper {
    display: flex;
    input {
      width: 200px;
    }
    .tags {
      margin-left: 6px;
      display: grid;
      grid-auto-flow: column;
      grid-gap: 8px;
      justify-content: start;
      cursor: pointer;
    }
  }
  .article {
    width: 100%;
    height: 55vh;
    overflow-y: scroll;
    padding: 16px 18px;
    box-sizing: border-box;
    background-color: var(--grey-28);
  }
  .helpers-btns {
    display: flex;
    gap: 8px;
  }
  .fixed-btns {
    position: fixed;
    display: flex;
    bottom: 22px;
    right: 22px;
  }
}

</style>
