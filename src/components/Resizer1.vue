<template>
  <div ref="resizerRowFourthX" class="resizer resizer-view-4X"></div>
  <div ref="resizerRowFourthY" class="resizer resizer-view-4Y"></div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";

const view1 = computed(() => playgroundStore.view === "view1");

const resizerRowFourthX = ref(null);
const resizerRowFourthY = ref(null);

const listenResizer = () => {
  const view1 = document.querySelector(".view1");
  const resizerX = resizerRowFourthX.value;
  const resizerY = resizerRowFourthY.value;

  const positioningResizer = ({ clientX, clientY }) => {
    resizerX.style.top = clientY + "px";
    resizerY.style.left = clientX + "px";
    view1.style.gridTemplateRows = `${clientY + 20 + "px"} 1fr `;
    view1.style.gridTemplateColumns = `${clientX - 50 + "px"} 1fr `;

    listenMouseUp();
  };

  const moveResizer = ({ target }) => {
    if (target.classList.contains("resizer")) {
      view1.addEventListener("mousemove", positioningResizer, false);
    }
  };

  resizerY.addEventListener("mousedown", moveResizer, false);
  resizerX.addEventListener("mousedown", moveResizer, false);

  const listenMouseUp = () => {
    window.addEventListener("mouseup", () => {
      view1.removeEventListener("mousemove", positioningResizer, false);
    });
  };
};

onMounted(() => {
  if (view1) setTimeout(() => listenResizer(), 50);
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
  position: fixed;
  width: 100%;
  height: 10px;
  top: 48.3vh;
  z-index: 999;
  background: linear-gradient(to right, #0b0b0b, rgb(9, 9, 9));
  border-block: 1px solid rgba(255, 255, 255, 0.45);
  padding-block: 2px;

  &:before {
    @include repeat("|", 10);
    position: absolute;
    font-size: 7px;
    letter-spacing: 5px;
    color: white;
    left: 47vw;
    top: 0;
    height: 0px;
    padding: 0;
  }

  &:hover {
    cursor: move;
  }
}
.resizer-view-4Y {
  position: fixed;
  width: 10px;
  height: 100%;
  top: 0vh;
  left: 51.5vw;
  z-index: 999;
  background: linear-gradient(to right, #0b0b0b, rgb(9, 9, 9));
  border-block: 1px solid rgba(255, 255, 255, 0.45);
  padding-block: 2px;

  &:before {
    @include repeat("|", 10);
    position: absolute;
    transform: rotate(90deg);
    letter-spacing: 5px;
    font-size: 7px;
    color: white;
    left: 0%;
    top: 46vh;
    width: 12px;
    padding: 0;
  }

  &:hover {
    cursor: move;
  }
}
</style>
