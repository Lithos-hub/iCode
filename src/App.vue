<template>
  <Navbar @set-theme="setTheme" @set-view="setView" />
  <Playground :theme="themeToSet" :view="viewToSet" :key="componentKey" />
</template>

<script setup>
import { ref } from "vue";
import Navbar from "./components/Navbar.vue";
import Playground from "./components/Playground.vue";

const themeToSet = ref("");
const viewToSet = ref("");

const componentKey = ref(0);

const setTheme = (theme) => {
  themeToSet.value = theme;
  componentKey.value += 1;
};
const setView = (view) => {
  viewToSet.value = view;
  componentKey.value += 1;
};
</script>

<style lang="scss">
@import "./scss/app.scss";
</style>
