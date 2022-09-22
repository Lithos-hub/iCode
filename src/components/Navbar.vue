<template>
  <div class="navbar">
    <div class="navbar__brand"></div>
    <button class="theme__button" @click="showThemeDialog">
      <mdicon name="cog" />
    </button>
    <small class="text-center">v{{ version }}</small>
  </div>
  <OptionsDialog
    v-if="isShowingThemeDialog"
    @selected-theme="setTheme"
    @selected-view="setView"
    class="dialog"
    @close-dialog="isShowingThemeDialog = false"
  />
</template>

<script setup>
import { ref } from "vue";
import OptionsDialog from "./OptionsDialog.vue";

const emit = defineEmits(["set-theme", "set-view"]);

const isShowingThemeDialog = ref(false);

const version = "0.6.0";

const showThemeDialog = () => (isShowingThemeDialog.value = true);

const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  emit("set-theme", theme);
};

const setView = (view) => {
  localStorage.setItem("view", view);
  emit("set-view", view);
};
</script>

<style lang="scss" scoped>
@import "../scss/app.scss";
@import "../scss/variables.scss";

.navbar {
  z-index: 9999;
  height: 100vh;
  width: 70px;
  position: relative;
  background: linear-gradient(0deg, rgb(19, 19, 19), rgb(0, 0, 0));
  // box-shadow: inset 0px 0px 20px black;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;

  small {
    margin-bottom: 1rem;
    color: $primaryColor;
    filter: brightness(1.2);
  }
}

.navbar__brand {
  margin: 0 auto;
  background: url("../assets/iCode-transparent.png");
  background-size: cover;
  height: 50px;
  width: 50px;
  margin-top: 2vh;
}

.theme__button {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  width: 50px;
  height: 50px;
  margin: 0 auto;
  border: none;
  background: linear-gradient(120deg, $primaryColor, $secondaryColor);
  border-radius: 50%;
  border: 1px solid white;

  &:hover {
    background: none;
    color: white;
    border: 1px solid white;
  }
}
</style>
