<template>
  <div class="main-home">
    <div class="header">
      <h1>Contacts</h1>
      <div class="input-wrapper">
        <h2>Say hello</h2>
        <p class="top-12">Email</p>
        <InputText placeholder="email" v-model:text="email" />
        <p class="top-12">Subject</p>
        <InputText placeholder="email" v-model:text="subject" />
        <p class="top-12">Message</p>
        <InputText placeholder="your message" v-model:text="msg" />
        <Btn class="top-24" @click="onEmailSend">Send</Btn>
      </div>
    </div>
  </div>
</template>

<script setup>
//==============================
// Import
//==============================
import {
  ref,
} from 'vue';
import {
  apiTest,
  apiSendEmail,
} from '../utils/api';

import Btn from '@/components/Btn.vue';
import InputText from '@/components/InputText.vue';

//==============================
// Consts
//==============================
const email = ref( undefined );
const subject = ref( undefined );
const msg = ref( undefined );

//==============================
// Functions
//==============================
async function onEmailSend() {
  apiSendEmail({ from: email.value, subject: subject.value, message: msg.value }).then((res) => console.log(res));
  email.value = undefined;
  msg.value = undefined;
  subject.value = undefined;
}


</script>

<style lang="scss" scoped>
.main-home {
  margin: 100px 22px 0 22px; //navbar
  .header {
    display: flex;
    h1 {
      writing-mode: vertical-lr;
    }
    .input-wrapper {
      margin: 22px 32px;

      h2 {
        line-height: 1.6;
        span {
          font-size: inherit;
          &.selected {
            border: 2px solid var(--primary);
            color: var(--primary);
            padding: 4px 6px;
            border-radius: 12px;
          }
          &.monospaced {
            font-family: monospace;
            opacity: 0.5;
          }
        }
      }
    }
  }
}
</style>
