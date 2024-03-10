//==================================
// Import
//==================================
import { ref } from 'vue';


//==================================
// Consts
//==================================
const MOBILE_W = 500;
const MONTHS   = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

export const toastMsg = ref( [] );
export const is_mobile = ref( window.innerWidth <= MOBILE_W );

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

function onResize() {
  is_mobile.value = window.innerWidth <= MOBILE_W;
}
window.addEventListener('resize', onResize);