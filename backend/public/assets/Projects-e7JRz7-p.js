import{_ as l,o as t,c as r,F as p,i as u,a,t as n,j as f,f as h,w as i,g as d,h as m}from"./index-gFowZ99-.js";import{B as _}from"./BaseLayout-s_WZcdIW.js";const y={class:"bento-grid"},g=["href"],b={class:"text"},w=["src"],v={__name:"BentoGrid",props:{items:{type:Array,default:()=>[]}},setup(o){return(s,c)=>(t(),r("div",y,[(t(!0),r(p,null,u(o.items,e=>(t(),r("a",{href:e.href,class:"item",key:e.id},[a("div",b,[a("label",null,n(e==null?void 0:e.title),1),a("p",null,n(e==null?void 0:e.content),1)]),e!=null&&e.iframe?(t(),r("iframe",{key:0,src:e.href},null,8,w)):f("",!0)],8,g))),128))]))}},S=l(v,[["__scopeId","data-v-b8c8322e"]]),j={__name:"Projects",setup(o){const s=[{id:Symbol(),large:!0,title:"Pegorer STA website",content:"Full responsive single page application with a structured multi steps contact form. Handled the SEO optimization",href:"https://www.pegorersta.it/",iframe:!0},{id:Symbol(),large:!0,title:"Machine learning for web accessibility",content:"Interacting with a website using your own body movements: through the device's webcam, the system can recognize postures or gestures of your choice; an action is associated for each of these gestures (scroll up, down, or zoom in)",href:"https://a3-project.netlify.app/",iframe:!0},{id:Symbol(),title:"Fractal tree",content:"Exploring the idea of recursive component in Vue.js",href:"https://fractal-tree-vue.netlify.app/",iframe:!0},{id:Symbol(),large:!0,title:"A* pathfinder",content:"An interactive simulation of the A* pathfinder algorithm",href:"https://apathfinder.netlify.app/",iframe:!0},{id:Symbol(),title:"Ray casting",content:"An interactive simulation of the Ray Casting algorithm",href:"https://ray-casting.netlify.app/"},{id:Symbol(),title:"NPM Vue.js components library",content:"Small ready to use UI components library",href:"https://www.npmjs.com/package/nicolo_cavalli_ui_lib",iframe:!1},{id:Symbol(),title:"2D vectors playground",content:"Interactive platform about 2D vectors",href:"https://2dvectors.netlify.app/"}];return(c,e)=>(t(),h(_,null,{title:i(()=>[d("Projects")]),default:i(()=>[m(S,{items:s})]),_:1}))}};export{j as default};
