<template>
  <div ref="resizerRowSecond" class="resizer resizer-view-2"></div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { usePlaygroundStore } from "../store/Playground";

const playgroundStore = usePlaygroundStore();

const view2 = computed(() => playgroundStore.view === "view2");
const resizerRowSecond = ref(null)

const listenResizer = () => {
  const viewWrapper = document.querySelector(".view2");
  const resizer = resizerRowSecond.value;
  const monacoWrapper = document.querySelectorAll(".monaco__wrapper");

  const positioningResizer = ({ clientY }) => {
    resizer.style.top = clientY + "px";
    monacoWrapper.forEach((wrapper) => {
      wrapper.style.minHeight = clientY + "px";
      wrapper.style.maxHeight = clientY + "px";
    });
    viewWrapper.style.gridTemplateRows = `${clientY + "px"} 1fr `;

    listenMouseUp();
  };

  const moveResizer = ({ target }) => {
    if (target.classList.contains("resizer") && view2) {
      viewWrapper.addEventListener("mousemove", positioningResizer, false);
    }
  };
  resizer.addEventListener("mousedown", moveResizer, false);

  const listenMouseUp = () => {
    window.addEventListener("mouseup", () => {
      viewWrapper.removeEventListener("mousemove", positioningResizer, false);
    });
  };
};

onMounted(() => {
  if (view2) {
    setTimeout(() => listenResizer(), 1000);
  }
});
</script>

<style lang="scss" scoped>
@mixin repeat($character, $n) {
  $c: "";
  @for $i from 1 through $n {
    $c: $c + $character;
  }
  content: $c;
}

.resizer-view-2 {
  position: absolute;
  width: 100vw;
  height: 10px;
  top: 48.3vh;
  z-index: 999;
  background: linear-gradient(to right, #0b0b0b, rgb(9, 9, 9));
  border-block: 1px solid rgba(255, 255, 255, 0.45);
  padding-block: 2px;

  &:before {
    @include repeat("|", 20);
    position: absolute;
    font-size: 7px;
    letter-spacing: 2px;
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
