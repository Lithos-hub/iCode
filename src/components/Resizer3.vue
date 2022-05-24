<template>
  <div ref="resizerRow" class="resizer resizer-view-3"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const resizerRow = ref(null);

const listenResizer = () => {
    const preview = document.querySelector("#prewiew");
  const resizer = resizerRow.value;
  const monacoWrapper = document.querySelectorAll(".monaco__wrapper");

  const positioningResizer = ({ clientX }) => {
    resizer.style.left = clientX + "px";
    monacoWrapper.forEach((wrapper) => {
      wrapper.style.minWidth = clientX - 80 + "px";
      wrapper.style.maxWidth = clientX - 80 + "px";
    });
    preview.style.left = clientX + 10 + "px";
    preview.style.width = "100%";

    listenMouseUp();
  };

  const moveResizer = ({ target }) => {
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
.resizer-view-3 {
  position: absolute;
  width: 10px;
  height: 100vh;
  top: 0vh;
  left: 50vw;
  z-index: 999;
  background: linear-gradient(to right, #0b0b0b, rgb(9, 9, 9));
  border-block: 1px solid rgba(255, 255, 255, 0.45);
  padding-block: 2px;

  &:before {
    content: "||||||||||||||||||||||||||||||||||||";
    position: absolute;
    transform: rotate(90deg);
    font-size: 7px;
    color: white;
    left: 0%;
    top: 50%;
    width: 12px;
    padding: 0;
  }

  &:hover {
    cursor: col-resize;
  }
}
</style>
