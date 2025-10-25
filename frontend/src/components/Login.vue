<template>
  <Modal :click_out_close="true" @close="emit('close')">
    <template #header>
      <h2>Login</h2>
    </template>
    <h4>Username</h4>
    <InputText placeholder="username" v-model:text="username" />
    <h4 class="top-12">Password</h4>
    <InputText placeholder="password" type="password" v-model:text="password" />
    <Btn class="top-12" :disabled="!username || !password" @click="onLogin">Confirm</Btn>
  </Modal>
</template>

<script setup>
// ==============================
// Import
// ==============================
import {
  ref,
} from 'vue';
import {
  token,
  isAdmin,
  addToastMsg,
} from '../utils/globals';

import { apiLogin } from '../utils/api';

import Btn       from './Btn.vue';
import Modal     from './Modal.vue';
import InputText from './InputText.vue';


// ==============================
// Props and emits
// ==============================
const emit = defineEmits([
  'close',
]);


// ==============================
// Consts
// ==============================
const username = ref ( undefined );
const password = ref( undefined );


// ==============================
// Function
// ==============================
async function onLogin() {
  const res = await apiLogin({ username: username.value, password: password.value });
  username.value = undefined;
  password.value = undefined;
  
  if ( res.code == 200 && res.status == 'OK' && res.data ) {
    isAdmin.value = res.data.auth;
    token.value = res.data.token;
    addToastMsg({ msg: "admin mode", time: 5000 });
    emit('close');
  } else {
    isAdmin.value = false;
    token.value = undefined;
    addToastMsg({msg: 'auth failure', time: 5000});
  }
}

</script>


<style lang="scss" scoped>
</style>