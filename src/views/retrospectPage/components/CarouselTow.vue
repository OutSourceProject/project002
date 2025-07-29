<script setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  batchNumInfo: {
    type: [String, Number],
    required: false,
    default: ''
  }
});
let items;
let startX;
let currentX;
const carouselRef = ref(null);
const currentIndex = ref(0);

// 显示指定索引的幻灯片
function showSlide(index) {
  // 移除当前活动项
  document.querySelector('.carousel-item.active').classList.remove('active');

  // 更新索引
  currentIndex.value = (index + items.length) % items.length;

  // 添加新活动项
  items[currentIndex.value].classList.add('active');
}

// 下一张幻灯片
function nextSlide() {
  showSlide(currentIndex.value + 1);
}

// 上一张幻灯片
function prevSlide() {
  showSlide(currentIndex.value - 1);
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
    nextSlide();
  } else if (diff < -threshold) {
    prevSlide();
  }
  startX = 0;
  currentX = 0;
};
onMounted(() => {
  nextTick(() => {
    items = document.querySelectorAll('.carousel-item');
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
  <div class="container">
    <div class="h-10 w-full flex items-center justify-center gap-1">
      <div
          v-for="item in [0,1]" :key="`indicator_${item}`"
          :class="['indicator-item',{'indicator-active':currentIndex === item}]"
          @click="showSlide(item)"
      ></div>
    </div>
    <div ref="carouselRef" class="carousel-container">
      <div class="carousel">
        <div class="carousel-item active">
          <div class="py-14 text-box">
            <p class="w-full text-center font-bold color-595757 font-size-20 mb-3">樱桃谷鸭</p>
            <p class="w-full text-center color-999999 font-size-16 leading-relaxed">批次号：{{ batchNumInfo }}</p>
            <p class="w-full text-center  color-999999 font-size-16 leading-relaxed">原产地：中国山东</p>
            <p class="w-full text-center  color-999999 font-size-16 leading-relaxed">执行标准：GB/T 14272-2021</p>
            <p class="w-full text-center  color-999999 font-size-16 leading-relaxed">生产商：羽丰羽绒有限公司</p>
          </div>
        </div>
        <div class="carousel-item">
          <div class="py-14 text-box">
            <p class="w-full text-center font-bold color-595757 font-size-20 mb-3">樱桃谷鸭</p>
            <p class="w-full text-center  color-999999 font-size-16 leading-relaxed">英国樱桃谷农场</p>
            <p class="w-full text-center  color-999999 font-size-16 leading-relaxed">于20世纪50年代培育而成，</p>
            <p class="w-full text-center  color-999999 font-size-16 leading-relaxed">其亲本为中国北京鸭与英国</p>
            <p class="w-full text-center  color-999999 font-size-16 leading-relaxed">埃里斯伯里鸭。</p>
            <p class="w-full text-center  color-999999 font-size-16 leading-relaxed">后经全球优质养殖区</p>
            <p class="w-full text-center  color-999999 font-size-16 leading-relaxed">（如中国、欧洲等地）科学培育，</p>
            <p class="w-full text-center  color-999999 font-size-16 leading-relaxed">
              目前是我国养殖量最大的鸭品种之一。
            </p>
            <p class="w-full text-center  color-999999 font-size-16 leading-relaxed">
              其通体洁白、绒朵蓬大、纤维细腻，
            </p>
            <p class="w-full text-center  color-999999 font-size-16 leading-relaxed">是高品质羽绒的优选原料之一。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  text-align: center;

  .indicator-item {
    @apply w-2 h-2 rounded bg-white;
    transition: width 0.4s ease-in-out;

    &.indicator-active {
      @apply w-10;
      transition: width 0.4s ease-in-out;
    }
  }

  .carousel-container {
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    height: 320px;
    width: calc(100vw - 80px);
    background: linear-gradient(to bottom, rgba(234, 234, 234, 0.3), rgba(255, 255, 255, 0.88));
    @apply rounded-2xl flex items-center justify-center;
    .carousel {
      position: relative;
      width: 100%;
      height: 100%;

      .carousel-item {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.9s ease-in-out;
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        .text-box {
          transform: translateY(30px);
          opacity: 0;
          transition: all 0.6s ease 0.45s;
        }

        &.active {
          opacity: 1;
          z-index: 1;

          .text-box {
            transform: translateY(0);
            opacity: 1;
            transition: all 0.6s ease 0.45s;
          }
        }
      }
    }
  }
}
</style>
