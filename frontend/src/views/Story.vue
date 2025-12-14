<template>
  <BaseLayout :hide_vertical="current_w < 600">
    <template #title>My story</template>
    <template #default>
      <div class="events">
        <Card v-for="item in items" :ref="(el) => cards[item.id] = el" :key="item.id" :item="item" />
      </div>
      <div v-if="current_w > 1000" class="date-box">
        <h3 v-for="id in ids" :key="id" @click="goTo(id)" :class="{'active': active_id == id}">{{ id }}</h3>
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
  watch,
  reactive,
  computed,
  onMounted,
} from "vue";
import {
  scroll_top,
  current_w,
} from "../utils/globals.js";
import * as data from "../text/story.json";

import Card from "@/components/Card.vue";
import BaseLayout from "@/components/BaseLayout.vue";

//==============================
// Consts
//==============================
const items = computed( () => [ ...data.education, ...data.professional] );
const cards = reactive( {} );
const rects = reactive( {} );
const ids = computed(() => items.value.map(el => el.id));
const active_id = ref( undefined );

//==============================
// Functions
//==============================
function goTo( id ) {
 if ( cards[id]?.card_ref ) {
  cards[id].card_ref.scrollIntoView( {behaviour: "smooth", block: "end", inline: "nearest"} );
  active_id.value = id;
 }
}

function setActiveCard( top ) {
  let lowest = Infinity;

  if ( Object.values(cards).length ) {
    for (const key in rects) {
      if (Object.prototype.hasOwnProperty.call(rects, key)) {
        const rect = rects[key];
        const elTop = rect.top;
        if (elTop > top && elTop < lowest) {
          lowest = elTop;
          active_id.value = key;
        }
      }
    }
  }
}

//==============================
// Watch
//==============================
watch( scroll_top, (newScrollTop) => {
  setActiveCard(newScrollTop)
})


//==============================
// Life cycle
//==============================
onMounted( () => {
  if ( Object.values(cards).length ) {
    for (const key in cards) {
      if (Object.prototype.hasOwnProperty.call(cards, key)) {
        const card = cards[key].card_ref;
        rects[key] = card.getBoundingClientRect();
      }
    }
  }
  setActiveCard( 0 );
});

</script>

<style lang="scss" scoped>
h3 {
  color: var(--grey-33);
}
.events {
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 22px;
  padding: 12px 0 22px 0;
  margin-right: 80px;
}
.date-box {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50%;
  top: 122px;
  right: 36px;
  width: 80px;
  cursor: pointer;
  h3 {
    transition-duration: var(--transition-medium);
    &.active, &:hover {
      color: var(--primary);
    }
    &:not(:last-of-type) {
      &:before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translate(0, 100%);
        width: 2px;
        height: 50px;
        background-color: var(--primary);
      }
    }
  }
}
</style>
