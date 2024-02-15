<template>
  <BaseLayout>
    <template #title>My story</template>
    <template #default>
      <div class="events">
        <Card v-for="item in items" :key="item.id" :item="item" />
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
const items = [
  {
    id: Symbol(),
    year: "2014-2017",
    title: "Bachelor's Degree in Psychology",
    content: {
      paragraph:
        "A humanistic starting point characterized by an integrated approach and a practical settings",
      list: [
        "knowledge in different areas of psychological disciplines",
        "methods and procedures of investigation and scientific research in the psychological field",
        "application in theoretical-practical laboratories in educational, clinical and work psychology field",
        "exercise of psychological tests",
        "development of intervention projects in educational and clinical field",
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
        "Course designed to acquire current skills in the field of AI with a strong focus in both technical and humanistic skills",
        tags: ["python", "keras", "pandas", "tensorflow"],
    },
  },
  {
    id: Symbol(),
    year: "2022-today",
    title: "Web Developer (iCare)",
    content: {
      paragraph:
        "Designing, developing, testing, debugging and improving usability and functionality of complex UI for medical applications in the ophthalmic field",
      tags: ["vue.js", "cypress", "jira", "confluence", "figma"],
    },
  },
];
</script>

<style lang="scss" scoped>
.events {
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 22px;
}

</style>
