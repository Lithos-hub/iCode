<template>
  <div
    ref="playground"
    :class="'view playground__wrapper ' + playgroundStore.view"
  >
    <div class="monaco__wrapper">
      <div id="monaco-editor-html" :key="componentKey"></div>
    </div>
    <div class="monaco__wrapper">
      <div id="monaco-editor-javascript" :key="componentKey"></div>
    </div>
    <div class="monaco__wrapper">
      <div id="monaco-editor-css" :key="componentKey"></div>
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
import { $ } from "../utils/Constants";

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

const debounceJSTimeout = ref();

// WATCHERS

watch(
  () => playgroundStore.theme,
  () => refreshMonaco()
);
watch(
  () => playgroundStore.view,
  (newView) => {
    changeView(newView);
    setGridStyles();
  }
);

// METHODS

const update = () => $("iframe").setAttribute("srcdoc", createHTML());

const refreshMonaco = () => {
  componentKey.value++;
  reloadMonaco();
  setGridStyles();
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
    monacoHTML.addEventListener("keydown", () => {
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
    monacoJS.addEventListener("keydown", () => {
      if (debounceJSTimeout.value) clearTimeout(debounceJSTimeout.value);
      debounceJSTimeout.value = setTimeout(() => {
        playgroundStore.writeJS(editor.getValue());
        update();
      }, 1000);
    });
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
    monacoCSS.addEventListener("keydown", (e) => {
      setTimeout(() => {
        playgroundStore.writeCSS(editor.getValue());
        update();
      }, 100);
    });
    watch(
      () => playgroundStore.cssValue,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
        if (newVal !== oldVal) {
          playgroundStore.writeCSS(editor.getValue());
          update();
        }
      }
    );
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

const setGridStyles = () => {
  console.log("Reseting styles...");

  const preview = $(".preview__wrapper");

  const navbarWidth = 70;
  const columnWidthView1 = navbarWidth / 2 + "px";
  const columnWidthView2 = navbarWidth / 3 + "px";
  const columnWidthView3 = navbarWidth / 2 + "px";
  const columnWidthView4 = navbarWidth / 4 + "px";

  if (selectedView.value === "view1") {
    const view1 = $(".view1");
    view1.style.gridTemplateColumns =
      `calc(100vw / 2 - ${columnWidthView1}) `.repeat(2);
    view1.style.gridTemplateRows = "50vh 50vh";
    preview.style.gridRow = "2 / 2";
    preview.style.gridColumn = "2 / 2";
  }
  if (selectedView.value === "view2") {
    const view2 = $(".view2");
    view2.style.gridTemplateColumns =
      `calc(100vw / 3 - ${columnWidthView2}) `.repeat(3);
    view2.style.gridTemplateRows = "50vh 50vh";
    preview.style.gridRow = "2 / 2";
    preview.style.gridColumn = "1 / 4";
  }
  if (selectedView.value === "view3") {
    const view3 = $(".view3");
    view3.style.gridTemplateColumns =
      `calc(100vw / 2 - ${columnWidthView3}) `.repeat(2);
    view3.style.gridTemplateRows = "33.33vh 33.33vh 33.33vh";
    preview.style.gridRow = "1 / span 3";
    preview.style.gridColumn = "2 / 2";
  }
  if (selectedView.value === "view4") {
    const view4 = $(".view4");
    view4.style.gridTemplateColumns =
      `calc(100vw / 4 - ${columnWidthView4}) `.repeat(4);
    view4.style.gridTemplateRows = "100vh";
    preview.style.gridColumn = "4 / 4";
    preview.style.gridRow = "1 / 1";
  }

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
    setGridStyles();
  }, 50);
});
</script>

<style lang="scss">
@import "../scss/app.scss";
@import "../scss/variables";

.playground__wrapper {
  position: relative;
}

.monaco-editor .lines-content.monaco-editor-background,
.margin-view-overlays {
  margin-top: 15px;
}

#monaco-editor-html:after {
  content: "";
  background: url("../../public/img/html.png");
  background-size: cover;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}
#monaco-editor-javascript:after {
  content: "";
  background: url("../../public/img/javascript.png");
  background-size: cover;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}
#monaco-editor-css:after {
  content: "";
  background: url("../../public/img/css.png");
  background-size: cover;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}

#monaco-editor-html,
#monaco-editor-javascript,
#monaco-editor-css {
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  position: relative;
  width: calc(100% - 7px);
  margin-right: 2.5px;
  height: 100%;
  resize: vertical;
  resize: horizontal;
  overflow: auto;
}

.view {
  display: grid;
  position: relative;
  margin: 0;
  height: 100vh;
  width: calc(100% - 70px);
  margin-right: 0px;
  overflow: hidden;
}

.view1 {
  .preview__wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0;
    grid-column: 2 / 2;
    grid-row: 2 / 2;
  }
}

.view2 {
  .preview__wrapper {
    position: relative;
    margin: 0;
    top: 50%;
    height: 100%;
    width: 100vw;
    grid-column: 1 / 4;
    grid-row: 2 / 2;
  }
}

.view3 {
  #monaco-editor-html,
  #monaco-editor-javascript,
  #monaco-editor-css {
    height: 33vh;
    grid-column: 1 / 2;
  }
  .preview__wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    margin: 0;
    grid-column: 2 / 2;
    grid-row: 1 / span 3;
  }
}

.view4 {
  #monaco-editor-html,
  #monaco-editor-javascript,
  #monaco-editor-css {
    height: 100vh;
  }

  .preview__wrapper {
    position: relative;
    height: 100vh;
    margin: 0;
    grid-column: 4 / 4;
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
