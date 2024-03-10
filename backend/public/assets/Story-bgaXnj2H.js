import{B as M}from"./BaseLayout--Dqu_lrp.js";import{_ as b,o as t,c as i,a as n,t as s,F as l,i as d,j as f,f as I,w as y,g as S,h as v,p as k,b as D}from"./index-8hsSbLV0.js";const w={class:"event"},C={class:"pin"},N=["href"],A={key:0},B={key:1,class:"tags"},j={__name:"Card",props:{item:Object},setup(e){return(u,m)=>{var r,c;return t(),i("div",w,[n("h2",null,s(e.item.year),1),n("h4",null,s(e.item.title),1),n("div",C,[(t(),i("svg",null,[n("use",{href:e.item.location.icon},null,8,N)])),n("h5",null,s(e.item.location.text),1)]),n("p",null,s(e.item.content.paragraph),1),(r=e.item.content.list)!=null&&r.length?(t(),i("ul",A,[(t(!0),i(l,null,d(e.item.content.list,(o,a)=>(t(),i("li",{key:a},s(o),1))),128))])):f("",!0),(c=e.item.content.tags)!=null&&c.length?(t(),i("div",B,[(t(!0),i(l,null,d(e.item.content.tags,o=>(t(),i("div",{class:"tag",key:o},[n("label",null,s(o),1)]))),128))])):f("",!0)])}}},_=b(j,[["__scopeId","data-v-8e042e35"]]),E=e=>(k("data-v-8459f841"),e=e(),D(),e),V=E(()=>n("h2",{class:"bottom-24"},"A glance over my academic and professional journey",-1)),$={class:"events"},P={class:"events"},U={__name:"Story",setup(e){const u=[{id:Symbol(),year:"2014 - 2017",title:"Bachelor's Degree in Psychology",location:{icon:"#school",text:"IUSVE University, Venice (VE)"},content:{paragraph:"A humanistic starting point characterized by an integrated approach and a practical settings",list:["methods and procedures of investigation and scientific research in the psychological field","application in theoretical-practical laboratories in educational, clinical and work psychology field","exercise of psychological tests"],tags:["communication","statistics","research methods"]}},{id:Symbol(),year:"2018 - 2021",title:"Master's Degree in Human Computer Interaction",location:{icon:"#school",text:"Milano-Bicocca University, Milan (MI)"},content:{paragraph:"Strongly interdisciplinary course diversified in different axes such as psychology, computer science, visual communication and the study of human language in its various expressions",list:["understanding of the basics of computer science, with a focus on the Web Development field","cognitive ergonomy and principles of visual design applied to digital products","design laboratories and experience of creating and developing a brand"],tags:["html","css","javascript","node.js","ux","ui","figma"]}},{id:Symbol(),year:"2021 - 2022",title:"2nd Level Master's Degree in Artificial Intelligence for Human Science",location:{icon:"#school",text:"Federico II University, Naples (NA)"},content:{paragraph:"University course designed to acquire current skills in the field of AI with a strong focus in both technical and humanistic skills",list:["history and state of art of psychology of learning and human intelligence","computational linguistics in KNIME environment","hands-on experience in implementing the most famous machine learning algorithms in Python"],tags:["python","keras","pandas","tensorflow"]}}],m=[{id:Symbol(),year:`2022 - today (${r()})`,title:"Web Developer (iCare)",location:{icon:"#office",text:"Padua (PD)"},content:{paragraph:"iCare is a trusted partner in ophthalmic diagnostics, offering physicians fast, easy-to-use, and reliable tools for diagnosis of glaucoma, diabetic retinopathy, and macular degeneration (AMD). Main tasks performed:",list:["maintain and develop the enterprise design system","develop, debug and improve usability and functionality of complex interface, from isolated base components to whole pages and views","unit test and end-to-end test in Cypress"],tags:["vue.js","cypress","jira","confluence","figma"]}}];function r(){const c=Math.abs(Date.now()-Date.parse("02/14/2022"));let o=Math.floor(c/1e3),a=Math.floor(o/60),p=Math.floor(a/60),h=Math.floor(p/24),g=Math.floor(h/30),x=Math.floor(h/365);return o%=60,a%=60,p%=24,h%=30,g%=12,`${x} years, ${g} months`}return(c,o)=>(t(),I(M,null,{title:y(()=>[S("My story")]),default:y(()=>[V,n("div",$,[(t(),i(l,null,d(u,a=>v(_,{key:a.id,item:a},null,8,["item"])),64))]),n("div",P,[(t(),i(l,null,d(m,a=>v(_,{key:a.id,item:a},null,8,["item"])),64))])]),_:1}))}},O=b(U,[["__scopeId","data-v-8459f841"]]);export{O as default};
