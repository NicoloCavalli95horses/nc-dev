<template>
  <BaseLayout :hide_vertical="current_w < 600">
    <template #title>Contacts</template>
    <template #default>
      <Ink />
      <section>
        <div class="contact-box">
          <p class="b-24 r-text">
           <a href="https://github.com/NicoloCavalli95horses"><svg><use href="#github"></use></svg></a>
           <a href="https://www.instagram.com/nicolo.cavalli95/"><svg><use href="#instagram"></use></svg></a>
           <a href="https://www.linkedin.com/in/nicolo-cavalli/"><svg><use href="#linkedin"></use></svg></a>
          </p>
          <div class="inputs">
            <label>Email</label>
            <InputText placeholder="email" v-model:text="email" autocomplete="email" />
            <label>Subject</label>
            <InputText placeholder="subject" v-model:text="subject" />
            <label>Message</label>
            <InputText placeholder="your message" type="textarea" v-model:text="msg" />
            <Btn :disabled="disable_send || !areFieldsValid" @click="onEmailSend">Send</Btn>
          </div>
        </div>
      </section>
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
} from 'vue';
import {
  apiSendEmail,
} from '../utils/api';
import {
  addToastMsg,
  current_w,
} from '@/utils/globals';

import Btn from '@/components/Btn.vue';
import Ink from '@/components/Ink.vue';
import InputText from '@/components/InputText.vue';
import BaseLayout from '@/components/BaseLayout.vue';

//==============================
// Consts
//==============================
const email = ref( undefined );
const subject = ref( undefined );
const msg = ref( undefined );
const disable_send = ref( false );
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const areFieldsValid = computed(() => emailRegex.test( email.value ) && subject.value && msg.value );

//==============================
// Functions
//==============================
async function onEmailSend() {
  disable_send.value = true;
  const res = await apiSendEmail({ from: email.value, subject: subject.value, message: msg.value });
  if ( res.code == 200 ) {
    addToastMsg({ msg: 'Email sent', time: 5000 }); 
  } else {
    addToastMsg({ msg: 'Email send failed', time: 5000 }); 
    console.error('send email failed:', res.error);
}
  disable_send.value = false;
  email.value = undefined;
  msg.value = undefined;
  subject.value = undefined;
}


</script>

<style lang="scss" scoped>
  section {
    position: relative;
    width: 100%;
    max-width: 800px;
    z-index: 1;
    .contact-box {
      .inputs {
        display: grid;
        grid-gap: 12px;
      }
    }
  }
</style>