<script setup>

import { Close } from "@element-plus/icons-vue";
import { nextTick, onMounted, onUnmounted, ref } from "vue";

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
      <div class="w-full">
        <div
            ref="carouselBoxRef"
            :class="['carousel-box',{'arrow-left':activeIndex=== 0},{'arrow-rigth':activeIndex=== 1}]"
        >
          <el-carousel
              ref="carouselRef"
              :activeIndex="activeIndex"
              :autoplay="false"
              arrow="always"
              indicator-position="outside"
              @change="carouselChange"
          >
            <el-carousel-item>
              <div class="carousel-container">
                <div class="w-full flex items-center justify-center">
                  <img alt="" class="w-full" src="@/assets/images/license001.jpg"/>
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="carousel-container">
                <div class="w-full flex items-center justify-center">
                  <img alt="" class="w-full" src="@/assets/images/license002.jpg"/>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
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
  .carousel-box {
    position: relative;
    padding-bottom: 40px;
    box-sizing: border-box;

    .carousel-container {
      width: $container_width;
      height: $carousel-container-height;
      @apply flex items-center justify-center;
    }

    :deep(.el-carousel) {
      width: calc(100vw - 80px);
      margin: 0 auto;
      position: static;

      .el-carousel__container {
        height: $carousel-container-height;
      }

      .el-carousel__item {
        border-radius: 1rem;
      }

      .el-carousel__arrow {
        display: flex !important;
        background-color: transparent !important;
        border: 2px solid rgba(151, 203, 230, 1);
        color: rgba(151, 203, 230, 1);
        font-size: 20px;
        overflow: hidden;
        border-radius: 18px;
        -webkit-tap-highlight-color: transparent;
        outline: none;

        &.el-carousel__arrow--left {
          top: calc(100% + 10px);
          left: calc(50% - 46px);
        }

        &.el-carousel__arrow--right {
          top: calc(100% + 10px);
          left: calc(50% + 10px);
        }
      }

      .el-carousel__indicators--outside {
        display: none;
      }
    }
  }
  .arrow-left {
    :deep(.el-carousel) {
      .el-carousel__arrow {
        &.el-carousel__arrow--left {
          border-width: 1px;
        }
      }
    }
  }

  .arrow-rigth {
    :deep(.el-carousel) {
      .el-carousel__arrow {
        &.el-carousel__arrow--right {
          border-width: 1px;
        }
      }
    }
  }
}
</style>
