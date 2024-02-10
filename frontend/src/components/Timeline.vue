<template>
  <div class="main-tl">
    <template v-for="item in items" :key="item.id">
      <div class="row">
        <div class="box year">
          <h2>{{ item.year }}</h2>
        </div>
        <div class="box body">
          <div class="line">
            <div class="icon">
              <svg><use :href="item.icon"></use></svg>
            </div>
          </div>
        </div>
        <div class="box text">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
//==============================
// Props and emits
//==============================
const props = defineProps({
  items: Array,
});

//==============================
// Consts
//==============================

//==============================
// Consts
//==============================
</script>

<style lang="scss" scoped>
$line-w: clamp(1em, 3.5vw, 4em);
$central-box-w: 40%;
.main-tl {
  width: 100%;
  height: calc(100vh - 120px);
  overflow-y: scroll;

  .row {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    box-sizing: border-box;
    margin: 22px 0;
    .box {
      width: calc(100% - $central-box-w);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
    }
    .year {
      h2 {
        font-size: clamp(3rem, 5vw, 7rem);
      }
    }
    .text {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h3, p {
        text-align: center;
      }

      h3 {
        font-size: clamp(1.5rem, 3vw, 4rem);
      }
    }
    &:first-child .body .line {
      border-radius: calc($line-w/2) calc($line-w/2) 0 0;
    }
    &:last-child .body .line {
      border-radius: 0 0 calc($line-w/2) calc($line-w/2);
    }
    .body {
      z-index: 2;
      height: 300px;
      .line {
        position: relative;
        width: $line-w;
        height: 100%;
        background-color: var(--secondary);
        .icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: white;
          border: calc($line-w/2) solid var(--secondary);
          display: grid;
          place-content: center;
          svg {
            width: clamp(0.8em, 4vw, 5em);
            height: clamp(0.8em, 4vw, 5em);
            color: var(--black);
          }
        }
      }
    }
  }
}
</style>
