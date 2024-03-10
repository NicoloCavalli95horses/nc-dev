import{B as _}from"./BaseLayout-R6UxC5kc.js";import{_ as f,o as a,c as i,a as n,t as s,F as o,i as c,j as p,f as b,w as h,g as k,h as m,p as x,b as S}from"./index-0_pPEbtd.js";const I={class:"event"},w={key:0},C={key:1,class:"tags"},D={__name:"Card",props:{item:Object},setup(e){return(d,u)=>{var r,l;return a(),i("div",I,[n("h2",null,s(e.item.year),1),n("h3",null,s(e.item.title),1),n("p",null,s(e.item.content.paragraph),1),(r=e.item.content.list)!=null&&r.length?(a(),i("ul",w,[(a(!0),i(o,null,c(e.item.content.list,(t,v)=>(a(),i("li",{key:v},s(t),1))),128))])):p("",!0),(l=e.item.content.tags)!=null&&l.length?(a(),i("div",C,[(a(!0),i(o,null,c(e.item.content.tags,t=>(a(),i("div",{class:"tag",key:t},[n("label",null,s(t),1)]))),128))])):p("",!0)])}}},g=f(D,[["__scopeId","data-v-07e35971"]]),y=e=>(x("data-v-ec0884ff"),e=e(),S(),e),B=y(()=>n("h3",{class:"bottom-24"},"Education",-1)),N={class:"events"},j=y(()=>n("h3",{class:"top-24"},"Professional experience",-1)),A={class:"events"},M={__name:"Story",setup(e){const d=[{id:Symbol(),year:"2014-2017",title:"Bachelor's Degree in Psychology",content:{paragraph:"A humanistic starting point characterized by an integrated approach and a practical settings",list:["methods and procedures of investigation and scientific research in the psychological field","application in theoretical-practical laboratories in educational, clinical and work psychology field","exercise of psychological tests"],tags:["communication","statistics","research methods"]}},{id:Symbol(),year:"2018-2021",title:"Master's Degree in Human Computer Interaction",content:{paragraph:"Strongly interdisciplinary course diversified in different axes such as psychology, computer science, visual communication and the study of human language in its various expressions",list:["understanding of the basics of computer science, with a focus on the Web Development field","cognitive ergonomy and principles of visual design applied to digital products","design laboratories and experience of creating and developing a brand"],tags:["html","css","javascript","node.js","ux","ui","figma"]}},{id:Symbol(),year:"2021-2022",title:"2nd Level Master's Degree in Artificial Intelligence for Human Science",content:{paragraph:"University course designed to acquire current skills in the field of AI with a strong focus in both technical and humanistic skills",list:["history and state of art of psychology of learning and human intelligence","computational linguistics in KNIME environment","hands-on experience in implementing the most famous machine learning algorithms in Python"],tags:["python","keras","pandas","tensorflow"]}}],u=[{id:Symbol(),year:"2022-today",title:"Web Developer (iCare)",content:{paragraph:"iCare is a trusted partner in ophthalmic diagnostics, offering physicians fast, easy-to-use, and reliable tools for diagnosis of glaucoma, diabetic retinopathy, and macular degeneration (AMD). Main tasks performed:",list:["maintain and develop the enterprise design system","develop, debug and improve usability and functionality of complex interface, from isolated base components to whole pages and views","unit test and end-to-end test in Cypress"],tags:["vue.js","cypress","jira","confluence","figma"]}}];return(r,l)=>(a(),b(_,null,{title:h(()=>[k("My story")]),default:h(()=>[B,n("div",N,[(a(),i(o,null,c(d,t=>m(g,{key:t.id,item:t},null,8,["item"])),64))]),j,n("div",A,[(a(),i(o,null,c(u,t=>m(g,{key:t.id,item:t},null,8,["item"])),64))])]),_:1}))}},O=f(M,[["__scopeId","data-v-ec0884ff"]]);export{O as default};
