<template>
  <div ref="resizerRowSecond" class="resizer resizer-view-2"></div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { usePlaygroundStore } from "../store/Playground";
import { $ } from "../utils/Constants";

const playgroundStore = usePlaygroundStore();

const view2 = computed(() => playgroundStore.view === "view2");
const resizerRowSecond = ref(null)

const listenResizer = () => {
  const view = $(".view2");
  const resizer = resizerRowSecond.value;

  const positioningResizer = ({ clientY }) => {
    const middleScreenHeight = window.innerHeight / 2;
    const frameDifference = middleScreenHeight - clientY;
    resizer.style.top = clientY + "px";
    view.style.gridTemplateRows = `${middleScreenHeight - frameDifference}px ${middleScreenHeight + frameDifference}px`;

    listenMouseUp();
  };

  const moveResizer = ({ target }) => {
    if (target.classList.contains("resizer") && view2) {
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
  if (view2) setTimeout(() => listenResizer(), 50);
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
  top: calc(100vh / 2 - 15px);
  z-index: 999;
  background: linear-gradient(to right, #0b0b0b, rgb(9, 9, 9));
  border-block: 1px solid rgba(255, 255, 255, 0.45);
  padding-block: 2px;

  &:before {
    @include repeat("|", 20);
    position: absolute;
    font-size: 7px;
    letter-spacing: 5px;
    color: white;
    left: calc(100vw / 2 - 95px);
    top: 0;
    height: 0px;
  }

  &:hover {
    cursor: row-resize;
  }
}
</style>
