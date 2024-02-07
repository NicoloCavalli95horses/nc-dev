<template>
  <BaseLayout>
    <template #title>Contacts</template>
    <template #default>
      <section>
        <div class="contact-box">
          <p><span>email</span> nicolo.cavalli95@gmail.com</p>
          <p><span>mobile</span> +39 346 95 92 168</p>
          <p><span>monday - friday</span> 8:00 - 20:00</p>
          <h4 class="top-32">Email</h4>
          <InputText placeholder="email" v-model:text="email" />
          <h4 class="top-12">Subject</h4>
          <InputText placeholder="email" v-model:text="subject" />
          <h4 class="top-12">Message</h4>
          <InputText placeholder="your message" type="textarea" v-model:text="msg" />
          <Btn :disabled="disable_send" class="top-24" @click="onEmailSend">Send</Btn>
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

//==============================
// Functions
//==============================
async function onEmailSend() {
  disable_send.value = true;
  apiSendEmail({ from: email.value, subject: subject.value, message: msg.value }).then(
    (res) => {
      if ( res.code == 200 ) {
        addToastMsg({ msg: 'Email successfully sent!', time: 5000 }); 
        disable_send.value = false;
      }
    }
  );
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
      margin: 0 22px;
      p {
        &:not(:first-of-type) {
          margin: 22px 0;
        }
        span {
          display: block;
          color: var(--secondary);
          text-transform: uppercase;
          letter-spacing: 2px;
        }
      }
    }
  }
</style>
