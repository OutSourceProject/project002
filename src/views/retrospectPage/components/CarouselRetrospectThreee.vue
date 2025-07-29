<script setup>
import { ref, computed, onMounted, nextTick, onUnmounted } from "vue";

let startX;
let currentX;
const activeIndex = ref(0);
const carouselRef = ref(null);
const translateVal = computed(() => {
  return `translateX(calc(${70 * activeIndex.value}px - ${100 * activeIndex.value}vw))`;
});

function showSlide(index) {
  // 移除当前活动项

  // 更新索引
  activeIndex.value = (index + 3) % 3;
}

// 下一张幻灯片
function nextSlide() {
  showSlide(activeIndex.value + 1);
}

// 上一张幻灯片
function prevSlide() {
  showSlide(activeIndex.value - 1);
}

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
  const threshold = 50;
  if (diff > threshold) {
    if ([0, 1].includes(activeIndex.value)) {
      nextSlide();
    }
  } else if (diff < -threshold) {
    if ([1, 2].includes(activeIndex.value)) {
      prevSlide();
    }
  }
  startX = 0;
  currentX = 0;
};
onMounted(() => {
  nextTick(() => {
    if (carouselRef.value) {
      carouselRef.value.addEventListener('touchstart', handleTouchStart);
      carouselRef.value.addEventListener('touchmove', handleTouchMove);
      carouselRef.value.addEventListener('touchend', handleTouchEnd);
    }
  });
});
onUnmounted(() => {
  if (carouselRef.value) {
    carouselRef.value.removeEventListener('touchstart', handleTouchStart);
    carouselRef.value.removeEventListener('touchmove', handleTouchMove);
    carouselRef.value.removeEventListener('touchend', handleTouchEnd);
  }
});
</script>

<template>
  <div class="carousel-retrospect-threee">
    <div ref="carouselRef" class="carousel-retrospect-container">
      <div class="guide-carousel-container">
        <div class="w-full flex items-center justify-start">
          <img alt="" class="w-16" src="@/assets/images/icon001.png"/>
        </div>
        <div class="h-2"></div>
        <div class="w-full flex items-center justify-start font-bold font-size-20">
          <span>机洗</span>
        </div>
        <div class="w-full flex items-center justify-start font-bold font-size-20 mt-2">
          <span>Machine Washable</span>
        </div>
        <div class="h-5"></div>
        <div class="font-size-16 color-999999 mb-3 leading-5">
          <p>仅限标注可机洗的款式，选择轻柔模式并使用专用洗涤剂洗后立即取出晾干。</p>
        </div>
        <div class="font-size-16 color-595757 mb-3">
          <p>清洁方法</p>
        </div>
      </div>
      <div class="guide-carousel-container">
        <div class="w-full flex items-center justify-start">
          <img alt="" class="w-16" src="@/assets/images/icon001.png"/>
        </div>
        <div class="h-2"></div>
        <div class="w-full flex items-center justify-start font-bold font-size-20">
          <span>局部清洁</span>
        </div>
        <div class="w-full flex items-center justify-start font-bold font-size-20 mt-2">
          <span>Localized Cleaningg</span>
        </div>
        <div class="h-5"></div>
        <div class="font-size-16 color-999999 mb-3 leading-5">
          <p>轻微污渍用羽绒服专用清洁剂擦拭，油渍先用卸妆湿巾处理再清洗。</p>
        </div>
        <div class="font-size-16 color-595757 mb-3">
          <p>清洁方法</p>
        </div>
      </div>
      <div class="guide-carousel-container">
        <div class="w-full flex items-center justify-start">
          <img alt="" class="w-16" src="@/assets/images/icon001.png"/>
        </div>
        <div class="h-2"></div>
        <div class="w-full flex items-center justify-start font-bold text-xl">
          <span>存储要点</span>
        </div>
        <div class="w-full flex items-center justify-start font-bold text-xl">
          <span>Storage Essentials</span>
        </div>
        <div class="h-5"></div>
        <div class="text-sm text-gray-400 mb-3">
          <p>
            完全干燥后折看或悬挂存放避免压缩。使用防尘罩或通风收纳袋，南方梅雨季每月晾晒通风。
          </p>
        </div>
        <div class="text-sm text-gray-400 mb-3">
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel-retrospect-threee {
  width: 100vw;
  overflow: hidden;
  margin: 0 auto auto 40px;

  .carousel-retrospect-container {
    @apply flex;
    transform: v-bind(translateVal);
    transition: transform .4s ease-in-out;
    width: calc(300vw - 180px);
    .guide-carousel-container {
      width: calc(100vw - 100px);
      background: linear-gradient(#ffffff, #ffffff);
      @apply rounded-2xl p-10 px-6 box-border;
    }
    .guide-carousel-container +.guide-carousel-container{
      margin-left: 30px;
    }
  }

}
</style>
