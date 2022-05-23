<template>
  <Navbar />
  <div class="monaco__grid">
    <div class="monaco__wrapper">
      <div id="monaco-editor-html" class="monaco__component"></div>
      <img
        class="tech__image"
        :src="`./img/html.png`"
        width="50"
        height="50"
        :alt="`Editor technology (html)`"
      />
    </div>
    <div class="monaco__wrapper">
      <div id="monaco-editor-javascript" class="monaco__component"></div>
      <img
        class="tech__image"
        :src="`./img/javascript.png`"
        width="50"
        height="50"
        :alt="`Editor technology (javascript)`"
      />
    </div>
    <div class="monaco__wrapper">
      <div id="monaco-editor-css" class="monaco__component"></div>
      <img
        class="tech__image"
        :src="`./img/css.png`"
        width="50"
        height="50"
        :alt="`Editor technology (css)`"
      />
    </div>
    <div class="preview__wrapper">
      <iframe id="prewiew" srcdoc="Have fun!"></iframe>
    </div>
  </div>
</template>

<script setup>
import loader from "@monaco-editor/loader";
import { onMounted, ref, watch } from "vue";
import Navbar from "./components/Navbar.vue";

const update = () => $("iframe").setAttribute("srcdoc", createHTML());

const $ = (selector) => document.querySelector(selector);

const htmlValue = ref("");
const cssValue = ref("");
const jsValue = ref("");

const counter = ref(0);

const loadMonacoHTML = () => {
  loader.init().then((monaco) => {
    const monacoHTML = $(`#monaco-editor-html`);
    let editor = monaco.editor.create(monacoHTML, {
      value: "",
      language: "html",
      theme: "vs-dark",
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
    });
    monacoHTML.addEventListener("keypress", () => {
      setTimeout(() => {
        htmlValue.value = editor.getValue();
        update();
      }, 500);
    });
  });
};
const loadMonacoJavascript = () => {
  loader.init().then((monaco) => {
    const monacoJS = $(`#monaco-editor-javascript`);
    let editor = monaco.editor.create(monacoJS, {
      value: "",
      language: "javascript",
      theme: "vs-dark",
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
    });
    jsValue.value = editor.getValue();
    let counterInterval = null;
    monacoJS.addEventListener("keypress", () => {
      counter.value = 0;
      clearInterval(counterInterval);
      counterInterval = setInterval(() => counter.value += 1, 1000);
    });
    watch(
      () => counter.value,
      (newVal) => {
        if (newVal >= 3) { // => JavaScript code only will be rendered after 3 seconds from the last typing
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
      value: "",
      language: "css",
      theme: "vs-dark",
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
    });
    cssValue.value = editor.getValue();
    monacoCSS.addEventListener("keypress", () => {
      setTimeout(() => {
        cssValue.value = editor.getValue();
        update();
      }, 500);
    });
  });
};

const createHTML = () => {
  return `
  <html>
    <head>
      <style>${cssValue.value}</style>
    </head>
    <body>
    ${htmlValue.value}
      <script>${jsValue.value}<\/script>
    </body>
  </html>`;
};

onMounted(() => {
  loadMonacoHTML();
  loadMonacoJavascript();
  loadMonacoCSS();
});
</script>

<style lang="scss">
@import "./scss/app.scss";

.monaco__grid {
  display: grid;
  position: relative;
  margin: 0 auto;
  padding-left: 70px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 100vh;
  gap: 10px;
  overflow: hidden;
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

.monaco__component {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.tech__image {
  position: absolute;
  bottom: 1rem;
  right: 2rem;
  opacity: 1;
}
</style>
