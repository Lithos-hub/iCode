<template>
  <div ref="resizerRowThird" class="resizer resizer-view-3"></div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { usePlaygroundStore } from "../store/Playground";

const playgroundStore = usePlaygroundStore();

const view3 = computed(() => playgroundStore.view === "view3");
const resizerRowThird = ref(null);

const listenResizer = () => {
  const viewWrapper = document.querySelector(".view3");
  const resizer = resizerRowThird.value;
  const monacoWrapper = document.querySelectorAll(".monaco__wrapper");

  const positioningResizer = ({ clientX }) => {
    resizer.style.left = clientX + "px";
    monacoWrapper.forEach((wrapper) => {
      wrapper.style.minWidth = clientX - 60 + "px";
      wrapper.style.maxWidth = clientX - 60 + "px";
    });
    viewWrapper.style.gridTemplateColumns = `${clientX - 60 + 'px'} 1fr`;

    listenMouseUp();
  };

  const moveResizer = ({ target }) => {
    if (target.classList.contains("resizer") && view3) {
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
  if (view3) {
    setTimeout(() => listenResizer(), 1000)
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

.resizer-view-3 {
  position: absolute;
  width: 10px;
  height: 100vh;
  top: 0vh;
  left: 51.5vw;
  z-index: 999;
  background: linear-gradient(to right, #0b0b0b, rgb(9, 9, 9));
  border-block: 1px solid rgba(255, 255, 255, 0.45);
  padding-block: 2px;

  &:before {
    @include repeat("|", 20);
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
