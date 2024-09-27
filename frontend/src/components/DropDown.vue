<template>
  <div class="main-dd">
    <div class="dd-wrapper" ref="dd_ref" :class="{ 'error': error }" @click="onToggle">
      <p :class="{ 'error': error }">{{ items.find((item) => item.id == active_id).val || placeholder }}</p>
      <svg :class="{ 'rotate': show }"><use href="#arrow-right"></use></svg>
      <teleport v-if="show" to=".modals">
        <div class="items" :style="{ 'max-height': `calc(${max_options} * ${DD_HEIGHT}`, 'left' : `${dd_rect.left}px`, 'top' : `calc(${dd_rect.top}px + ${DD_HEIGHT} + 8px)`, 'width' : `${dd_rect.width}px` }">
          <div
            v-for="item of items"
            :key="item.id"
            class="item"
            :class="{ 'active': active_id == item.id }"
            @click="(e) => onClick(e, item)"
          >
            <p class="l-12">{{ item.val }}</p>
            <svg v-if="active_id == item.id" class="r-12"><use href="#check"></use></svg>
          </div>
        </div>
      </teleport>
    </div>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { ref } from "vue";

// ==============================
// Props
// ==============================
const props = defineProps({
  active_id: [String, Number],
  placeholder: {
    type: String,
    default: () => "Select an option",
  },
  title: String,
  items: Array,
  error: Boolean,
  max_options: {
    type: Number,
    default: 4,
  },
});

const emit = defineEmits(["update:active_id", "unselect"]);

// ==============================
// Consts
// ==============================
const DD_HEIGHT = "5.2rem";
const show      = ref( false );
const dd_ref    = ref( undefined );
const dd_rect   = ref( undefined );

// ==============================
// Functions
// ==============================
function onToggle() {
  show.value = !show.value;
  dd_rect.value = dd_ref.value.getBoundingClientRect();
  console.log(dd_rect.value)
}

function onClick(e, item) {
  e.stopPropagation();
  show.value = false;
  emit("update:active_id", item.id);
}
</script>

<style lang="scss" scoped>
.dd-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: v-bind("DD_HEIGHT");
  padding: 0 1.5rem;
  box-sizing: border-box;
  border-radius: var(--radius-m);
  cursor: pointer;
  user-select: none;
  background-color: var(--grey-33);
  &.error {
    border: 0.2rem solid var(--error);
  }
  .rotate {
    transition-duration: var(--transition-medium);
    transform: rotate(90deg);
  }
  p {
    &.error {
      color: var(--error);
    }
  }
}
.items {
  position: absolute;
  overflow-y: auto;
  border-radius: var(--radius-s);
  box-shadow: rgba(0, 0, 0, 0.25) 0 0.4rem 1.2rem,
    rgba(0, 0, 0, 0.22) 0 0.2rem 0.2rem;
  color: var(--font-light);
  cursor: pointer;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: v-bind("DD_HEIGHT");
    box-sizing: border-box;
    background-color: var(--grey-33);
    transition-duration: var(--transition-medium);
    &:hover {
      filter: brightness(110%);
      background-color: var(--primary);
      transition-duration: var(--transition-medium);
    }
    &.active {
      background-color: var(--primary);
    }
    p {
      &.error {
        color: var(--error);
      }
    }
  }
}
</style>
