<template>
  <BaseLayout>
    <template #title>My story</template>
    <template #default>
      <h2 class="bottom-24">A glance over my academic and professional journey</h2>
      <div class="events">
        <Card v-for="item in EDUCATION" :key="item.id" :item="item" />
      </div>
      <div class="events">
        <Card v-for="item in PROFESSIONAL" :key="item.id" :item="item" />
      </div>
    </template>
  </BaseLayout>
</template>

<script setup>
//==============================
// Import
//==============================
import BaseLayout from "@/components/BaseLayout.vue";
import Card from "@/components/Card.vue";

//==============================
// Consts
//==============================
const EDUCATION = [
  {
    id: Symbol(),
    year: "2014 - 2017",
    location: "IUSVE University, Venice (VE)",
    title: "Bachelor's Degree in Psychology",
    content: {
      paragraph: "A humanistic starting point characterized by an integrated approach and a practical settings",
      list: [
        "methods and procedures of investigation and scientific research in the psychological field",
        "application in theoretical-practical laboratories in educational, clinical and work psychology field",
        "exercise of psychological tests",
      ],
      tags: ["communication", "statistics", "research methods"],
    },
  },
  {
    id: Symbol(),
    year: "2018 - 2021",
    title: "Master's Degree in Human Computer Interaction",
    location: "Milano-Bicocca University, Milan (MI)",
    content: {
      paragraph:
        "Strongly interdisciplinary course diversified in different axes such as psychology, computer science, visual communication and the study of human language in its various expressions",
      list: [
        "understanding of the basics of computer science, with a focus on the Web Development field",
        "cognitive ergonomy and principles of visual design applied to digital products",
        "design laboratories and experience of creating and developing a brand",
      ],
      tags: ["html", "css", "javascript", "node.js", "ux", "ui", "figma"],
    },
  },
  {
    id: Symbol(),
    year: "2021 - 2022",
    title: "2nd Level Master's Degree in Artificial Intelligence for Human Science",
    location: "Federico II University, Naples (NA)",
    content: {
      paragraph: "University course designed to acquire current skills in the field of AI with a strong focus in both technical and humanistic skills",
      list: [
        "history and state of art of psychology of learning and human intelligence",
        "computational linguistics in KNIME environment",
        "hands-on experience in implementing the most famous machine learning algorithms in Python",
      ],
      tags: ["python", "keras", "pandas", "tensorflow"],
    },
  },
];

const PROFESSIONAL = [
  {
    id: Symbol(),
    year: `2022 - today (${ getProExpTime() })`,
    title: "Web Developer (iCare)",
    location: "Padua (PDA)",
    content: {
      paragraph:
        "iCare is a trusted partner in ophthalmic diagnostics, offering physicians fast, easy-to-use, and reliable tools for diagnosis of glaucoma, diabetic retinopathy, and macular degeneration (AMD). Main tasks performed:",
      list: [
        "maintain and develop the enterprise design system",
        "develop, debug and improve usability and functionality of complex interface, from isolated base components to whole pages and views",
        "unit test and end-to-end test in Cypress",
      ],
      tags: ["vue.js", "cypress", "jira", "confluence", "figma"],
    },
  },
];

function getProExpTime() {
  const diff = Math.abs(Date.now() - Date.parse('02/14/2022'));
  let seconds = Math.floor(diff / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours   = Math.floor(minutes / 60);
  let days    = Math.floor(hours / 24);
  let months  = Math.floor(days / 30);
  let years   = Math.floor(days / 365);
  seconds %= 60;
  minutes %= 60;
  hours %= 24;
  days %= 30;
  months %= 12;

  return `${years} years, ${months} months`;
}
</script>

<style lang="scss" scoped>
h3 {
  font-family: monospace;
  letter-spacing: -1px;
  color: var(--grey-33);
}
.events {
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 22px;
}
</style>
