import{_ as y,o as x,c as _,j as S,r as c,k as w,f as B,w as v,g as p,a as e,h as r,B as k,l as b,p as I,b as C}from"./index-0_pPEbtd.js";import{B as E}from"./BaseLayout-R6UxC5kc.js";const q="https://nicolocavalli.com/api/";async function T({from:t,subject:o,message:l}){const a=`${q}email`,n=$({method:"POST",body:JSON.stringify({from:t,subject:o,message:l})});return fetch(a,n).then(s=>s.json()).then(s=>s)}function $({method:t,mode:o,cache:l,credentials:a,headers:n,redirect:s,referrerPolicy:m,body:h}={}){return{method:t||"GET",mode:o||"cors",cache:l||"no-cache",credentials:a||"same-origin",body:h||void 0,headers:n||{"Content-Type":"application/json"},redirect:s||"follow",referrerPolicy:m||"origin"}}const j=["value","required","placeholder"],N=["value","required","placeholder"],A={__name:"InputText",props:{text:String,type:{type:String,default:"text"},placeholder:String,is_required:Boolean},emits:["update:text"],setup(t,{emit:o}){return(l,a)=>t.type=="text"?(x(),_("input",{key:0,type:"text",autocomplete:"none",value:t.text,required:t.is_required,placeholder:t.placeholder,onInput:a[0]||(a[0]=n=>l.$emit("update:text",n.target.value))},null,40,j)):t.type=="textarea"?(x(),_("textarea",{key:1,autocomplete:"none",value:t.text,required:t.is_required,placeholder:t.placeholder,onInput:a[1]||(a[1]=n=>l.$emit("update:text",n.target.value))},null,40,N)):S("",!0)}},f=y(A,[["__scopeId","data-v-3b0f92cc"]]),u=t=>(I("data-v-48db322e"),t=t(),C(),t),V={class:"contact-box"},U=u(()=>e("p",null,[e("a",{href:"https://github.com/NicoloCavalli95horses"},[e("svg",null,[e("use",{href:"#github"})])]),e("a",{href:"https://www.instagram.com/nicolo.cavalli95/"},[e("svg",null,[e("use",{href:"#instagram"})])]),e("a",{href:"https://www.linkedin.com/in/nicolo-cavalli/"},[e("svg",null,[e("use",{href:"#linkedin"})])])],-1)),z=u(()=>e("p",null,[e("label",null,"email"),p(" nicolo.cavalli95@gmail.com")],-1)),O=u(()=>e("p",null,[e("label",null,"mobile"),p(" +39 346 95 92 168")],-1)),Z={class:"inputs"},L=u(()=>e("h4",null,"Email",-1)),M=u(()=>e("h4",null,"Subject",-1)),P=u(()=>e("h4",null,"Message",-1)),R={__name:"Contacts",setup(t){const o=c(void 0),l=c(void 0),a=c(void 0),n=c(!1),s=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,m=w(()=>s.test(o.value)&&l.value&&a.value);async function h(){n.value=!0,T({from:o.value,subject:l.value,message:a.value}).then(g=>{g.code==200&&b({msg:"Email sent",time:5e3}),n.value=!1},()=>{b({msg:"Email send failed",time:5e3}),n.value=!1}),o.value=void 0,a.value=void 0,l.value=void 0}return(g,i)=>(x(),B(E,null,{title:v(()=>[p("Contacts")]),default:v(()=>[e("section",null,[e("div",V,[U,z,O,e("div",Z,[L,r(f,{placeholder:"email",text:o.value,"onUpdate:text":i[0]||(i[0]=d=>o.value=d)},null,8,["text"]),M,r(f,{placeholder:"email",text:l.value,"onUpdate:text":i[1]||(i[1]=d=>l.value=d)},null,8,["text"]),P,r(f,{placeholder:"your message",type:"textarea",text:a.value,"onUpdate:text":i[2]||(i[2]=d=>a.value=d)},null,8,["text"]),r(k,{disabled:n.value||!m.value,onClick:h},{default:v(()=>[p("Send")]),_:1},8,["disabled"])])])])]),_:1}))}},J=y(R,[["__scopeId","data-v-48db322e"]]);export{J as default};
