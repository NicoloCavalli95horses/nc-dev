//==================================
// Import
//==================================
import {
  ref,
  watch,
} from 'vue';


//==================================
// Consts
//==================================
const MOBILE_W = 500;
const MONTHS   = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

export const toastMsg  = ref( [] );
export const is_mobile = ref( window.innerWidth <= MOBILE_W );
export const is_admin  = ref( false );

window.addEventListener('resize', () => is_mobile.value = window.innerWidth <= MOBILE_W);

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

//==================================
// Watchers
//==================================
watch( is_admin, (newVal) => {
  if (newVal) {
    addToastMsg({msg: 'admin mode', time: 5000});
  }
});