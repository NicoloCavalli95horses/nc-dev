<template>
  <BaseLayout>
    <template #title>My story</template>
    <template #default>
      <!-- <div class="quote"> -->
        <!-- <Quote /> -->
      <!-- </div> -->
      <h3 class="bottom-24">Education</h3>
      <div class="events">
        <Card v-for="item in EDUCATION" :key="item.id" :item="item" />
      </div>
      <h3 class="top-24">Professional experience</h3>
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
import Quote from "@/components/Quote.vue";

//==============================
// Consts
//==============================
const EDUCATION = [
  {
    id: Symbol(),
    year: "2014-2017",
    title: "Bachelor's Degree in Psychology",
    content: {
      paragraph:
        "A humanistic starting point characterized by an integrated approach and a practical settings",
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
    year: "2018-2021",
    title: "Master's Degree in Human Computer Interaction",
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
    year: "2021-2022",
    title:
      "2nd Level Master's Degree in Artificial Intelligence for Human Science",
    content: {
      paragraph:
        "University course designed to acquire current skills in the field of AI with a strong focus in both technical and humanistic skills",
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
    year: "2022-today",
    title: "Web Developer (iCare)",
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
</script>

<style lang="scss" scoped>
h3 {
  font-family: monospace;
  letter-spacing: -1px;
  color: var(--grey-33);
}
.quote {
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
}
.events {
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 22px;
}
</style>
