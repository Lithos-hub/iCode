<template>
  <div ref="resizerRow" class="resizer resizer-view-2"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const resizerRow = ref(null);

const listenResizer = () => {
  const preview = document.querySelector("#prewiew");
  const resizer = resizerRow.value;
  const monacoWrapper = document.querySelectorAll(".monaco__wrapper");

  const positioningResizer = ({ clientY }) => {
    resizer.style.top = clientY + "px";
    monacoWrapper.forEach((wrapper) => {
      wrapper.style.minHeight = clientY + "px";
      wrapper.style.maxHeight = clientY + "px";
    });
    preview.style.top = clientY + "px";

    listenMouseUp();
  };

  const moveResizer = ({ target }) => {
    console.log(target)
    if (target.classList.contains("resizer")) {
      window.addEventListener("mousemove", positioningResizer, false);
    }
  }

  window.addEventListener("mousedown", moveResizer, false);

  const listenMouseUp = () => {
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", positioningResizer, false);
    });
  };
};

onMounted(() => setTimeout(() => listenResizer(), 1000));
</script>

<style lang="scss" scoped>
.resizer-view-2 {
  position: absolute;
  width: 100vw;
  height: 10px;
  top: 50vh;
  z-index: 999;
  background: linear-gradient(to right, #0b0b0b, rgb(9, 9, 9));
  border-block: 1px solid rgba(255, 255, 255, 0.45);
  padding-block: 2px;

  &:before {
    content: "||||||||||||||||||||||||||||||||||||";
    position: absolute;
    font-size: 7px;
    color: white;
    left: 50%;
    top: 0;
    height: 0px;
    padding: 0;
  }

  &:hover {
    cursor: row-resize;
  }
}
</style>
