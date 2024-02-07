//==================================
// Import
//==================================
import { ref } from 'vue';


//==================================
// Consts
//==================================
export const toastMsg = ref( [] );


//==================================
// Functions
//==================================
export function addToastMsg({ msg, time }) {
  const id = Date.now() + '' + Math.random() * 100;
  toastMsg.value.push({ id, msg, time });
}