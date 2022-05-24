<template>
  <section class="dialog__outer--wrapper fadeIn__mid">
    <article class="card">
      <div class="dialog__themesOptions">
        <h2 class="text-center">Select a theme</h2>
        <div class="d-flex">
          <div class="dialogOption--wrapper">
            <button
              :class="
                selectedTheme === 'vs-dark'
                  ? 'theme__button selected__theme'
                  : 'theme__button'
              "
              ref="darkThemeBtn"
              @click="selectTheme('darkThemeBtn', 'vs-dark')"
            >
              <mdicon name="moon-waning-crescent" size="50" />
            </button>
            <p>Dark</p>
          </div>
          <div class="dialogOption--wrapper">
            <button
              :class="
                selectedTheme === 'vs-light'
                  ? 'theme__button selected__theme'
                  : 'theme__button'
              "
              ref="lighThemeBtn"
              @click="selectTheme('lighThemeBtn', 'vs-light')"
            >
              <mdicon name="lightbulb-on" size="50" />
            </button>
            <p>Light</p>
          </div>
          <div class="dialogOption--wrapper">
            <button
              :class="
                selectedTheme === 'hc-black'
                  ? 'theme__button selected__theme'
                  : 'theme__button'
              "
              ref="hcThemeBtn"
              @click="selectTheme('hcThemeBtn', 'hc-black')"
            >
              <mdicon name="brightness-4" size="50" />
            </button>
            <p>High Contrast</p>
          </div>
        </div>
      </div>
      <div class="dialog__ViewOptions">
        <h2 class="text-center">Select a view</h2>
        <div class="d-flex">
          <div class="dialogOption--wrapper">
            <button
              id="view1__btn"
              :class="
                storagedView === 'view1'
                  ? 'view__button selected__view'
                  : 'view__button'
              "
              ref="view1Btn"
              @click="selectView('view1Btn', 'view1')"
            >
              <div class="innerButton__square square__html"></div>
              <div class="innerButton__square square__js"></div>
              <div class="innerButton__square square__css"></div>
              <div class="innerButton__square--preview"></div>
            </button>
          </div>
          <div class="dialogOption--wrapper">
            <button
              id="view2__btn"
              :class="
                storagedView === 'view2'
                  ? 'view__button selected__view'
                  : 'view__button'
              "
              ref="view2Btn"
              @click="selectView('view2Btn', 'view2')"
            >
              <div class="innerButton__square square__html"></div>
              <div class="innerButton__square square__js"></div>
              <div class="innerButton__square square__css"></div>
              <div class="innerButton__square--preview"></div>
            </button>
          </div>
          <div class="dialogOption--wrapper">
            <button
              id="view3__btn"
              :class="
                storagedView === 'view3'
                  ? 'view__button selected__view'
                  : 'view__button'
              "
              ref="view3Btn"
              @click="selectView('view3Btn', 'view3')"
            >
              <div class="innerButton__square square__html"></div>
              <div class="innerButton__square square__js"></div>
              <div class="innerButton__square square__css"></div>
              <div class="innerButton__square--preview"></div>
            </button>
          </div>
          <div class="dialogOption--wrapper">
            <button
              id="view4__btn"
              :class="
                storagedView === 'view4'
                  ? 'view__button selected__view'
                  : 'view__button'
              "
              ref="view4Btn"
              @click="selectView('view4Btn', 'view4')"
            >
              <div class="innerButton__square square__html"></div>
              <div class="innerButton__square square__js"></div>
              <div class="innerButton__square square__css"></div>
              <div class="innerButton__square--preview"></div>
            </button>
          </div>
        </div>
        <button class="close__button" @click="closeDialog">Close</button>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePlaygroundStore } from "../store/Playground";

const playgroundStore = usePlaygroundStore();

const emit = defineEmits(["closeDialog", "selectedTheme", "selectedView"]);

const closeDialog = () => emit("closeDialog");

const darkThemeBtn = ref(null);
const lighThemeBtn = ref(null);
const hcThemeBtn = ref(null);
const view1Btn = ref(null);
const view2Btn = ref(null);
const view3Btn = ref(null);
const view4Btn = ref(null);

const selectedTheme = computed(() => playgroundStore.theme);
const storagedView = computed(() => playgroundStore.view);

const selectTheme = (element, option) => {
  playgroundStore.changeTheme(option);
  localStorage.setItem("theme", option);

  darkThemeBtn.value.classList.remove("selected__theme");
  lighThemeBtn.value.classList.remove("selected__theme");
  hcThemeBtn.value.classList.remove("selected__theme");

  const elements = {
    darkThemeBtn: darkThemeBtn.value,
    lighThemeBtn: lighThemeBtn.value,
    hcThemeBtn: hcThemeBtn.value,
  };

  const selectedElement = elements[element];

  if (
    selectedElement.classList.contains("theme__button") &&
    !selectedElement.classList.contains("selected__theme")
  ) {
    selectedElement.classList.toggle("selected__theme");
  }
};
const selectView = (element, option) => {
  playgroundStore.changeView(option);
  localStorage.setItem("view", option);

  view1Btn.value.classList.remove("selected__view");
  view2Btn.value.classList.remove("selected__view");
  view3Btn.value.classList.remove("selected__view");
  view4Btn.value.classList.remove("selected__view");

  const elements = {
    view1Btn: view1Btn.value,
    view2Btn: view2Btn.value,
    view3Btn: view3Btn.value,
    view4Btn: view4Btn.value,
  };

  const selectedElement = elements[element];

  if (
    selectedElement.classList.contains("view__button") &&
    !selectedElement.classList.contains("selected__view")
  ) {
    selectedElement.classList.toggle("selected__view");
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";

.card {
  padding: 25px;
  border-radius: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  background: #202020;
  height: auto;
  width: 800px;
  box-shadow: 0px 0px 50px black;
}

.dialog__themesOptions {
  border-bottom: 1px solid rgba(255, 255, 255, 0.179);
}

.dialog__ViewOptions {
  margin-bottom: 4rem;
}

.dialogOption--wrapper {
  width: 100%;
  border-radius: 25px;
  padding: 25px;
  text-align: center;
}

.theme__button {
  transition: $transitionMid;
  clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
  cursor: pointer;
  height: 120px;
  margin: 0 auto;
  width: 100%;
  border-radius: 25px;
  border: none;
  border-top: 1px solid $primaryColor;
  border-bottom: 1px solid $secondaryColor;
  background: transparent;
  color: white;

  &:hover {
    color: $primaryColor;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    background: rgba(255, 255, 255, 0.041);
    clip-path: none;
    border-radius: 0px;
  }
}

.selected__theme {
  color: $primaryColor;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  background: rgba(255, 255, 255, 0.041);
  clip-path: none;
  border-radius: 0px;
}

.close__button {
  cursor: pointer;
  transition: $transitionFast;
  padding: 10px;
  width: 150px;
  border-radius: 10px;
  border: none;
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  background: linear-gradient(120deg, white 50%, $primaryColor 50%);
  color: white;
  background-size: 250% 200%;
  background-position: -220px 0px;
  font-weight: bolder;
  font-size: 20px;

  &:hover {
    background-position: 0px 0px;
    color: #202020;
  }
}
.view__image {
  width: 100%;
  height: auto;
}

.view__button {
  transition: $transitionFast;
  cursor: pointer;
  border: none;
  background: none;
  padding: 5px;

  &:hover {
    border: 1px solid white;
  }
}

.selected__view {
  border: 1px solid white;
}

#view1__btn {
  display: grid;
  grid-template-columns: 50px 50px;
  grid-template-rows: 50px 50px;
  gap: 2px;

  .innerButton__square {
    width: 50px;
    height: 50px;
  }
  .innerButton__square--preview {
    width: 50px;
    height: 100%;
    background: white;
  }
}

#view2__btn {
  display: grid;
  grid-template-columns: 50px 50px 50px;
  grid-template-rows: 50px 50px;
  gap: 2px;

  .innerButton__square {
    width: 50px;
    height: 100%;
  }
  .innerButton__square--preview {
    width: 100%;
    height: 100%;
    background: white;
    grid-column: 1 / 4;
  }
}

#view3__btn {
  display: grid;
  grid-template-columns: 50px 50px;
  grid-template-rows: 50px 50px 50px;
  gap: 2px;

  .innerButton__square {
    width: auto;
    height: 100%;
  }
  .innerButton__square--preview {
    width: auto;
    height: 100%;
    background: white;
    grid-column: 2 / 2;
    grid-row: 1 / 4;
  }
}

#view4__btn {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: 100px;
  gap: 2px;

  .innerButton__square {
    width: auto;
    height: 100%;
  }
  .innerButton__square--preview {
    width: auto;
    height: 100%;
    background: white;
  }
}

.square__html {
  background: #e34f26;
}
.square__js {
  background: #efd81d;
}
.square__css {
  background: #2173f7;
}
</style>
