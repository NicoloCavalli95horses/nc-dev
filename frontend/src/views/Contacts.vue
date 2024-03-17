<template>
  <BaseLayout>
    <template #title>Contacts</template>
    <template #default>
      <section>
        <div class="contact-box">
          <p>
            <a href="https://github.com/NicoloCavalli95horses"><svg><use href="#github"></use></svg></a>
            <a href="https://www.instagram.com/nicolo.cavalli95/"><svg><use href="#instagram"></use></svg></a>
            <a href="https://www.linkedin.com/in/nicolo-cavalli/"><svg><use href="#linkedin"></use></svg></a>
          </p>
          <p><label>email</label> nicolo.cavalli95@gmail.com</p>
          <p><label>mobile</label> +39 346 95 92 168</p>
          <div class="inputs">
            <h4>Email</h4>
            <InputText placeholder="email" v-model:text="email" autocomplete="email" />
            <h4>Subject</h4>
            <InputText placeholder="subject" v-model:text="subject" />
            <h4>Message</h4>
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
} from '../utils/globals';

import Btn from '@/components/Btn.vue';
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
    console.error('send email failed:', err);
}
  disable_send.value = false;
  email.value = undefined;
  msg.value = undefined;
  subject.value = undefined;
}


</script>

<style lang="scss" scoped>
  section {
    width: 100%;
    max-width: 800px;
    .contact-box {
      p {
        &:not(:first-of-type) {
          margin: 22px 0;
        }
      }
      .inputs {
        display: grid;
        grid-gap: 12px;
      }
    }
  }
</style>
