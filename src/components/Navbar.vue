<template>
  <div class="navbar">
    <h1 class="navbar__brand">iC</h1>
    <button class="theme__button" @click="toggleTheme">
      <mdicon
        :name="isDarkMode ? 'moon-waning-crescent' : 'white-balance-sunny'"
      />
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isDarkMode = ref(true);

const toggleTheme = () => {
    
}
</script>

<style lang="scss" scoped>
.navbar {
  z-index: 9999;
  height: 100vh;
  width: 70px;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(120deg, black, rgb(15, 14, 14));
  box-shadow: inset 0px 0px 10px black;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
}

.navbar__brand {
  font-size: 50px;
  text-align: center;
  margin: 0 auto;
  font-weight: lighter;
  background: linear-gradient(120deg, yellow, red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  height: 70px;
  width: 70px;
}

.theme__button {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  width: 50px;
  height: 50px;
  margin: 0 auto;
  border: none;
  background: white;
  border-radius: 50%;
  border: 1px solid transparent;

  &:hover {
    background: none;
    color: white;
    border: 1px solid white;
  }
}
</style>
