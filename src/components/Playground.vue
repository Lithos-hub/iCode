<template>
  <div ref="playground" class="view3">
    <div class="monaco__wrapper">
      <div id="monaco-editor-html"></div>
      <img
        class="tech__image"
        :src="`./img/html.png`"
        width="50"
        height="50"
        :alt="`Editor technology (html)`"
      />
    </div>
    <div class="monaco__wrapper">
      <div id="monaco-editor-javascript"></div>
      <img
        class="tech__image"
        :src="`./img/javascript.png`"
        width="50"
        height="50"
        :alt="`Editor technology (javascript)`"
      />
    </div>
    <div class="monaco__wrapper">
      <div id="monaco-editor-css"></div>
      <img
        class="tech__image"
        :src="`./img/css.png`"
        width="50"
        height="50"
        :alt="`Editor technology (css)`"
      />
    </div>
    <Resizer2 v-if="view === 'view2' || storagedView === 'view2'" />
    <Resizer3 v-if="view === 'view3' || storagedView === 'view3'" />
    <div class="preview__wrapper" id="prewiew">
      <iframe srcdoc="Let's code!"></iframe>
    </div>
  </div>
</template>

<script setup>
import loader from "@monaco-editor/loader";
import { onMounted, ref, watch, computed } from "vue";
import Resizer2 from "./Resizer2.vue";
import Resizer3 from "./Resizer3.vue";
import { usePlaygroundStore } from '../store/Playground';

// STORE

const playgroundStore = usePlaygroundStore();

// PROPS
const props = defineProps({
  theme: {
    type: String,
    default: "vs-dark",
  },
  view: {
    type: String,
    default: "view1",
  },
});

const { theme, view } = props;

// REFS
const storagedTheme = ref("");
const storagedView = ref("");
const playground = ref(null);

const htmlCode = computed(() => playgroundStore.htmlValue);
const cssCode = computed(() => playgroundStore.cssValue);
const jsCode = computed(() => playgroundStore.jsValue);

const counter = ref(0);

// WATCHERS

watch(
  () => theme,
  () => reloadMonaco()
);
watch(
  () => view,
  (newView) => changeView(newView)
);

// METHODS

const update = () => $("iframe").setAttribute("srcdoc", createHTML());
const $ = (selector) => document.querySelector(selector);

const reloadMonaco = () => {
  setTimeout(() => {
    loadMonacoHTML();
    loadMonacoCSS();
    loadMonacoJavascript();
  }, 250);
};

const changeView = (view) => {
  playground.value.classList.add(view);
};

const loadView = () => {
  const view = localStorage.getItem("view") || "view1";
  storagedView.value = view;
  playground.value.classList.remove("view1");
  playground.value.classList.remove("view2");
  playground.value.classList.remove("view3");
  playground.value.classList.add(view);
};

const loadTheme = () => {
  storagedTheme.value = localStorage.getItem("theme");
};

const loadMonacoHTML = () => {
  loader.init().then((monaco) => {
    const monacoHTML = $(`#monaco-editor-html`);
    let editor = monaco.editor.create(monacoHTML, {
      value: htmlCode.value,
      language: "html",
      theme: `${theme || storagedTheme.value}`,
      automaticLayout: true,
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
      theme: `${theme || storagedTheme.value}`,
      automaticLayout: true,
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
      theme: `${theme || storagedTheme.value}`,
      automaticLayout: true,
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

// LIFECYCLE

onMounted(() => {
  loadView();
  loadTheme();
  reloadMonaco();
  update();
});
</script>

<style lang="scss">
@import "../scss/app.scss";
@import "../scss/variables";

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
  padding-left: 70px;
  position: relative;
  margin: 0 auto;
  height: 100vh;
  gap: 10px;
  overflow: hidden;
}
.view2 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding-left: 70px;
  position: relative;
  margin: 0 auto;
  height: 100vh;
  gap: 10px;
  overflow: hidden;

  #monaco-editor-html,
  #monaco-editor-javascript,
  #monaco-editor-css {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .preview__wrapper {
    position: absolute;
    padding-left: 70px;
    height: 100%;
    margin-top: 10px;
    bottom: 0;
    top: 50%;
    min-width: 100vw;
    width: 100%;
  }
}

.view3 {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  position: relative;
  padding-left: 70px;
  margin: 0 auto;
  height: 100vh;
  gap: 10px;
  overflow: hidden;

  .monaco__wrapper {
    position: relative;
    display: block;
    height: 33vh;
    width: 46vw;
  }

  .preview__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    width: 49.5vw;
    min-height: 100vh;
    margin: 0 auto;
  }
}

.view4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
  padding-left: 70px;
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
  width: 100%;
  height: 100%;
}

.preview__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
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
