<template>
  <div ref="resizerRowFourthX" class="resizer resizer-view-4X"></div>
  <div ref="resizerRowFourthY" class="resizer resizer-view-4Y"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";
import { $ } from "../utils/Constants";

const view1 = computed(() => playgroundStore.view === "view1");

const resizerRowFourthX = ref(null);
const resizerRowFourthY = ref(null);

const listenResizer = () => {
  const view = $(".view1");
  const resizerX = resizerRowFourthX.value;
  const resizerY = resizerRowFourthY.value;

  const positioningResizer = ({ clientX, clientY }) => {
    const middleScreenHeight = window.innerHeight / 2;
    const frameDifferenceY = middleScreenHeight - clientY;
    const middleScreenWidth = window.innerWidth / 2;
    const frameDifferenceX = middleScreenWidth - clientX;
    resizerX.style.top = clientY + "px";
    resizerY.style.left = `${clientX - 70}px`;
    view.style.gridTemplateRows = `${middleScreenHeight - frameDifferenceY}px ${
      middleScreenHeight + frameDifferenceY
    }px`;
    view.style.gridTemplateColumns = `${
      middleScreenWidth - frameDifferenceX - 70
    }px ${middleScreenWidth + frameDifferenceX}px`;

    listenMouseUp();
  };

  const moveResizer = ({ target }) => {
    if (target.classList.contains("resizer")) {
      view.addEventListener("mousemove", positioningResizer, false);
    }
  };

  resizerY.addEventListener("mousedown", moveResizer, false);
  resizerX.addEventListener("mousedown", moveResizer, false);

  const listenMouseUp = () => {
    window.addEventListener("mouseup", () => {
      view.removeEventListener("mousemove", positioningResizer, false);
    });
  };
};

onMounted(() => {
  if (view1) setTimeout(() => listenResizer(), 50);
});

onUnmounted(() => {
  window.removeEventListener("mouseup");
  view.removeEventListener("mousemove", positioningResizer, false);
  resizerY.removeEventListener("mousedown", moveResizer, false);
  resizerX.removeEventListener("mousedown", moveResizer, false);
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

.resizer-view-4X {
  position: absolute;
  width: 100%;
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
    cursor: move;
  }
}
.resizer-view-4Y {
  position: absolute;
  width: 10px;
  height: 100%;
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
    letter-spacing: 5px;
    font-size: 7px;
    color: white;
    top: calc(100vh / 2 - 70px);
    width: 12px;
  }

  &:hover {
    cursor: move;
  }
}
</style>
