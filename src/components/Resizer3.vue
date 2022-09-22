<template>
  <div ref="resizerRowThird" class="resizer resizer-view-3"></div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { usePlaygroundStore } from "../store/Playground";
import { $, $$ } from "../utils/Constants";

const playgroundStore = usePlaygroundStore();

const view3 = computed(() => playgroundStore.view === "view3");
const resizerRowThird = ref(null);

const listenResizer = () => {
  const view = $(".view3");
  const resizer = resizerRowThird.value;

  const positioningResizer = ({ clientX }) => {
    const middleScreenWidth = window.innerWidth / 2;
    const frameDifference = middleScreenWidth - clientX;
    resizer.style.left = `${clientX - 70}px`;
    view.style.gridTemplateColumns = `${middleScreenWidth - frameDifference - 70}px ${middleScreenWidth + frameDifference}px`;

    listenMouseUp();
  };

  const moveResizer = ({ target }) => {
    if (target.classList.contains("resizer") && view3) {
      view.addEventListener("mousemove", positioningResizer, false);
    }
  };

  resizer.addEventListener("mousedown", moveResizer, false);

  const listenMouseUp = () => {
    window.addEventListener("mouseup", () => {
      view.removeEventListener("mousemove", positioningResizer, false);
    });
  };
};

onMounted(() => {
  if (view3) setTimeout(() => listenResizer(), 250);
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

.resizer-view-3 {
  position: absolute;
  width: 10px;
  height: 100vh;
  top: 0vh;
  left: calc(100vw / 2 - 35px);
  z-index: 999;
  background: linear-gradient(to right, #0b0b0b, rgb(9, 9, 9));
  border-block: 1px solid rgba(255, 255, 255, 0.45);
  padding-block: 2px;

  &:before {
    @include repeat("|", 20);
    position: absolute;
    transform: rotate(90deg);
    font-size: 7px;
    letter-spacing: 5px;
    color: white;
    top: calc(100vh / 2 - 55px);
    width: 12px;
    padding: 0;
  }

  &:hover {
    cursor: col-resize;
  }
}
</style>
