//==================================
// Import
//==================================
import { ref } from 'vue';


//==================================
// Consts
//==================================
export const toastMsg = ref( [] );
const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec'
]

//==================================
// Functions
//==================================
export function addToastMsg({ msg, time }) {
  const id = Date.now() + '' + Math.random() * 100;
  toastMsg.value.push({ id, msg, time });
}

export function filterDate( date ) {
  const d = new Date( date );
  const day = d.getDate();
  const month_idx = d.getMonth();
  const year = d.getFullYear();
  return `${day} ${MONTHS[month_idx]} ${year}`
}