<script setup>

import { Close } from "@element-plus/icons-vue";
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import LicenseCarousel from "@/views/licensePage/components/LicenseCarousel.vue";

let startX;
let currentX;
const activeIndex = ref(0);
const carouselBoxRef = ref(null);
const carouselRef = ref(null);
const goBack = () =>{
  window.history.back();
}
const carouselChange = (current) => {
  activeIndex.value = current;
};
const handleTouchStart = (e) => {
  startX = e.touches[0].clientX;
  currentX = startX;
};
const handleTouchMove = (e) => {
  if (!startX) {
    return;
  }
  currentX = e.touches[0].clientX;
};
const handleTouchEnd = (e) => {
  if (!startX) {
    return;
  }

  const diff = startX - currentX;
  if (!diff) {
    return;
  }
  const threshold = 10;
  if (diff > threshold) {
    carouselRef.value.next();
  } else if (diff < -threshold) {
    carouselRef.value.prev();
  }
  startX = 0;
  currentX = 0;
};
onMounted(() => {
  nextTick(() => {
    if (carouselBoxRef.value) {
      carouselBoxRef.value.addEventListener('touchstart', handleTouchStart);
      carouselBoxRef.value.addEventListener('touchmove', handleTouchMove);
      carouselBoxRef.value.addEventListener('touchend', handleTouchEnd);
    }
  });
});
onUnmounted(() => {
  if (carouselBoxRef.value) {
    carouselBoxRef.value.removeEventListener('touchstart', handleTouchStart);
    carouselBoxRef.value.removeEventListener('touchmove', handleTouchMove);
    carouselBoxRef.value.removeEventListener('touchend', handleTouchEnd);
  }
});
</script>

<template>
  <div class="license-page">
    <div class="box-border p-10 flex flex-col items-center justify-between w-full h-full">
      <div class="w-full flex items-center justify-start">
        <div class="w-10 h-10 flex items-center justify-center" @click="goBack">
          <el-icon :size="30" color="#999999">
            <Close/>
          </el-icon>
        </div>
      </div>
      <LicenseCarousel/>
      <div class="w-full h-10">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$carousel-container-height: 500px;
$container_width: calc(100vw - 80px);
.license-page {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background: rgba(234, 234, 234, 1);
  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }
}
</style>
