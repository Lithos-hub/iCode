<template>
  <div class="playground__wrapper" ref="playground" :class="playgroundStore.view">
    <div class="monaco__wrapper">
      <div id="monaco-editor-html" :key="componentKey"></div>
      <!-- <img
        class="tech__image"
        :src="`./img/html.png`"
        width="50"
        height="50"
        :alt="`Editor technology (html)`"
      /> -->
    </div>
    <div class="monaco__wrapper">
      <div id="monaco-editor-javascript" :key="componentKey"></div>
      <!-- <img
        class="tech__image"
        :src="`./img/javascript.png`"
        width="50"
        height="50"
        :alt="`Editor technology (javascript)`"
      /> -->
    </div>
    <div class="monaco__wrapper">
      <div id="monaco-editor-css" :key="componentKey"></div>
      <!-- <img
        class="tech__image"
        :src="`./img/css.png`"
        width="50"
        height="50"
        :alt="`Editor technology (css)`"
      /> -->
    </div>
    <Resizer1 v-if="playgroundStore.view === 'view1'" :key="componentKey" />
    <Resizer2 v-if="playgroundStore.view === 'view2'" :key="componentKey" />
    <Resizer3 v-if="playgroundStore.view === 'view3'" :key="componentKey" />
    <div class="preview__wrapper" id="prewiew">
      <iframe srcdoc=""></iframe>
    </div>
  </div>
</template>

<script setup>
import loader from "@monaco-editor/loader";
import { onMounted, ref, watch, computed } from "vue";
import Resizer2 from "./Resizer2.vue";
import Resizer3 from "./Resizer3.vue";
import { usePlaygroundStore } from "../store/Playground";
import Resizer1 from "./Resizer1.vue";

// STORE

const playgroundStore = usePlaygroundStore();

// REFS
const playground = ref(null);

const htmlCode = computed(() => playgroundStore.htmlValue);
const cssCode = computed(() => playgroundStore.cssValue);
const jsCode = computed(() => playgroundStore.jsValue);

const counter = ref(0);
const componentKey = ref(0);
const selectedView = computed(() => playgroundStore.view);

// WATCHERS

watch(
  () => playgroundStore.theme,
  () => refreshMonaco()
);
watch(
  () => playgroundStore.view,
  (newView) => {
    changeView(newView);
    resetStyles();
  }
);

// METHODS

const update = () => $("iframe").setAttribute("srcdoc", createHTML());
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const refreshMonaco = () => {
  componentKey.value++;
  reloadMonaco();
  resetStyles();
};

const reloadMonaco = () => {
  loadMonacoHTML();
  loadMonacoCSS();
  loadMonacoJavascript();
};

const changeView = (view) => playground.value.classList.add(view);

const loadMonacoHTML = () => {
  loader.init().then((monaco) => {
    const monacoHTML = $(`#monaco-editor-html`);
    let editor = monaco.editor.create(monacoHTML, {
      value: htmlCode.value,
      language: "html",
      theme: playgroundStore.theme,
      automaticLayout: true,
      minimap: { enabled: false },
    });
    monacoHTML.addEventListener("keypress", () => {
      setTimeout(() => {
        playgroundStore.writeHTML(editor.getValue());
        update();
      }, 100);
    });
  });
};
const loadMonacoJavascript = () => {
  loader.init().then((monaco) => {
    const monacoJS = $(`#monaco-editor-javascript`);
    let editor = monaco.editor.create(monacoJS, {
      value: jsCode.value,
      language: "javascript",
      theme: playgroundStore.theme,
      automaticLayout: true,
      minimap: { enabled: false },
    });
    let counterInterval = null;
    monacoJS.addEventListener("keypress", () => {
      playgroundStore.writeJS(editor.getValue());
      counter.value = 0;
      clearInterval(counterInterval);
      counterInterval = setInterval(() => (counter.value += 1), 1000);
    });
    watch(
      () => counter.value,
      (newVal) => {
        if (newVal >= 3) {
          // => JavaScript code only will be rendered after 3 seconds from the last typing
          jsValue.value = editor.getValue();
          update();
          clearInterval(counterInterval);
        }
      }
    );
  });
};
const loadMonacoCSS = () => {
  loader.init().then((monaco) => {
    const monacoCSS = $(`#monaco-editor-css`);
    let editor = monaco.editor.create(monacoCSS, {
      value: cssCode.value,
      language: "css",
      theme: playgroundStore.theme,
      automaticLayout: true,
      minimap: { enabled: false },
    });
    monacoCSS.addEventListener("keypress", () => {
      setTimeout(() => {
        playgroundStore.writeCSS(editor.getValue());
        update();
      }, 100);
    });
  });
};

const createHTML = () => {
  return `
  <html>
    <head>
      <style>${cssCode.value}</style>
    </head>
    <body>
    ${htmlCode.value}
      <script>${jsCode.value}<\/script>
    </body>
  </html>`;
};

const resetStyles = () => {
  console.log('Reseting styles!')
  const preview = $(".preview__wrapper");
  preview.classList.remove(".preview__wrapper");
  preview.classList.add(".preview__wrapper");
  const monacoWrapper = $$(".monaco__wrapper");

  const view1 = $('.view1')
  const view2 = $('.view2')
  const view3 = $('.view3')
  const view4 = $('.view4')

  if (selectedView.value === 'view1') {
    view1.style.gridTemplateColumns = '1fr 1fr'
    view1.style.gridTemplateRows = '1fr 1fr'
  }
  if (selectedView.value === 'view2') {
    view2.style.gridTemplateColumns = '1fr 1fr 1fr'
    view2.style.gridTemplateRows = '1fr 1fr'
  }
  if (selectedView.value === 'view3') {
    view3.style.gridTemplateColumns = '1fr 1fr'
    view3.style.gridTemplateRows = '1fr 1fr 1fr'
  }
  if (selectedView.value === 'view4') {
    view4.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
  }


  monacoWrapper.forEach((wrapper) => {
    wrapper.style.minHeight = "initial";
    wrapper.style.minWidth = "initial";
    wrapper.style.maxHeight = "initial";
    wrapper.style.maxWidth = "initial";
  });
  monacoWrapper.forEach((wrapper) => {
    wrapper.classList.remove('.monaco__wrapper');
  });
  monacoWrapper.forEach((wrapper) => {
    wrapper.classList.add('.monaco__wrapper');
  });

  preview.style.top = "initial";
  preview.style.left = "initial";
  preview.style.width = "initial";
  preview.style.height = "initial";

};

// LIFECYCLE

onMounted(() => {
  setTimeout(() => {
    reloadMonaco();
    update();
    resetStyles();
  }, 1000);
});
</script>

<style lang="scss">
@import "../scss/app.scss";
@import "../scss/variables";

.playground__wrapper {
  position: relative;
}

#monaco-editor-html:after {
  content: '';
  background: url('../../public/img/html.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 1rem;
  right: 2rem;
}
#monaco-editor-javascript:after {
  content: '';
  background: url('../../public/img/javascript.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 1rem;
  right: 2rem;
}
#monaco-editor-css:after {
  content: '';
  background: url('../../public/img/css.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 1rem;
  right: 2rem;
}

#monaco-editor-html,
#monaco-editor-javascript,
#monaco-editor-css {
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  position: relative;
  width: 100%;
  height: 100%;
  resize: vertical;
  overflow: auto;
}

.view1 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding-left: 60px;
  position: relative;
  margin: 0 auto;
  height: 100vh;
  max-height: 100vh;
  width: auto;
  max-width: 100vw;
  overflow: hidden;

  .monaco__wrapper {
    position: relative;
    bottom: 0;
  }

  #monaco-editor-html,
  #monaco-editor-javascript,
  #monaco-editor-css {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 250px;
    min-width: 250px;
  }

  .preview__wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0;
  }
}

.view2 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding-left: 60px;
  position: relative;
  margin: 0 auto;
  height: 100vh;
  gap: 5px;
  overflow: hidden;

  #monaco-editor-html,
  #monaco-editor-javascript,
  #monaco-editor-css {
    position: relative;
    width: 31.5vw;
    height: 100%;
  }

  .preview__wrapper {
    position: relative;
    padding-left: 60px;
    margin: 0;
    top: 50%;
    height: 100%;
    width: 100%;
    grid-column: 1 / 4;
  }
}

.view3 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  position: relative;
  padding-left: 60px;
  margin: 0;
  min-width: 49vw;
  width: auto;
  height: 100vh;
  gap: 5px;
  overflow: hidden;

  #monaco-editor-html,
  #monaco-editor-javascript,
  #monaco-editor-css {
    position: relative;
    width: 100%;
    height: 33vh;
    grid-column: 1 / 2;
  }
  .preview__wrapper {
    position: relative;
    width: 100%;
    margin: 0;
    grid-column: 2 / 2;
    grid-row: 1 / span 3;
  }
}

.view4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
  padding-left: 60px;
  .monaco__wrapper {
    display: block;
  }

  .preview__wrapper {
    position: relative;
    min-height: 100vh;
    width: 100%;
  }
}

.monaco__wrapper {
  position: relative;
}

.preview__wrapper {
  background: white;
  color: black;
}

iframe {
  position: relative;
  margin: 0;
  width: 100%;
  height: 100%;
  border: none !important;
}

.tech__image {
  position: absolute;
  bottom: 1rem;
  right: 2rem;
  opacity: 1;
}
</style>
