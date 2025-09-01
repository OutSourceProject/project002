<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue';
import ArrowsButton from '@/components/ArrowsButton.vue';

const props = defineProps({
  batchNumInfo: {
    type: [String, Number],
    required: false,
    default: ''
  },
  executiveStandard: {
    type: [String, Number],
    required: false,
    default: ''
  }
});
let startX;
let currentX;
const carouselTrackRef = ref(null);
const currentIndex = ref(0);
const totalItems = 2;
const updateCarousel = () => {
  if (carouselTrackRef.value) {
    carouselTrackRef.value.style.transform = `translateX(-${currentIndex.value * 50}%)`;
  }
};

// 下一张幻灯片
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % totalItems;
  updateCarousel();
};
// 上一张幻灯片
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + totalItems) % totalItems;
  updateCarousel();
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
const moveHandle = () => {
  switch (currentIndex.value) {
    case 0:
      nextSlide();
      break;
    case 1:
      prevSlide();
      break;
    default:
      if (currentIndex.value > 1) {
        currentIndex.value = 1;
      }
      if (currentIndex.value < 0) {
        currentIndex.value = 0;
      }
  }
};
const leftHandle = () => {
  moveHandle();
};
const rightHandle = () => {
  moveHandle();
};
const handleTouchEnd = (e) => {
  if (!startX) {
    return;
  }
  const diff = startX - currentX;
  const threshold = 50;
  if (diff > threshold) {
    rightHandle();
  } else if (diff < -threshold) {
    leftHandle();
  }
  startX = 0;
  currentX = 0;
};
onMounted(() => {
  nextTick(() => {
    if (carouselTrackRef.value) {
      carouselTrackRef.value.addEventListener('touchstart', handleTouchStart);
      carouselTrackRef.value.addEventListener('touchmove', handleTouchMove);
      carouselTrackRef.value.addEventListener('touchend', handleTouchEnd);
    }
  });
});
onUnmounted(() => {
  if (carouselTrackRef.value) {
    carouselTrackRef.value.removeEventListener('touchstart', handleTouchStart);
    carouselTrackRef.value.removeEventListener('touchmove', handleTouchMove);
    carouselTrackRef.value.removeEventListener('touchend', handleTouchEnd);
  }
});
</script>

<template>
  <div class="elementary-carousel-example">
    <div class="h-10 w-full flex items-center justify-center gap-1">
      <div
          v-for="item in [0,1]"
          :key="`indicator_${item}`"
          :class="['indicator-item',{'indicator-active':currentIndex === item}]"
      ></div>
    </div>
    <div class="carousel-container">
      <div class="carousel-content">
        <div ref="carouselTrackRef" class="carousel-track">
          <div :class="['carousel-item',{'item-active':currentIndex === 0}]">
            <div class="item-content py-14">
              <div class="py-14">
                <p class="w-full text-center font-bold color-595757 font-size-20 mb-3">樱桃谷鸭</p>
                <p class="w-full text-center color-999999 font-size-16 leading-relaxed">批次号：{{ batchNumInfo }}</p>
                <p class="w-full text-center  color-999999 font-size-16 leading-relaxed">原产地：中国山东</p>
                <p class="w-full text-center  color-999999 font-size-16 leading-relaxed">
                  执行标准：{{ executiveStandard }}</p>
                <p class="w-full text-center  color-999999 font-size-16 leading-relaxed">羽绒生产商：羽丰羽绒有限公司</p>
              </div>
            </div>
          </div>
          <div :class="['carousel-item',{'item-active':currentIndex === 1}]">
            <div class="item-content">
              <div class="py-14">
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.elementary-carousel-example {
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  width: 100%;
  overflow: hidden;

  .indicator-item {
    @apply w-2 h-2 rounded bg-white;
    transition: width 0.4s ease-in-out;

    &.indicator-active {
      @apply w-10;
      transition: width 0.4s ease-in-out;
    }
  }

  .carousel-container {
    max-width: 1200px;
    width: 100%;

    .carousel-content {
      .carousel-track {
        display: flex;
        height: 100%;
        width: 200%;
        transition: transform 0.6s ease-in-out;

        .carousel-item {
          flex-basis: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: all 1s ease-in-out;

          .item-content {
            max-width: 600px;
            text-align: center;
            width: calc(100% - 80px);
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 1) 100%);
            @apply rounded-2xl;
          }
        }

        .item-active {
          opacity: 1;
          transition: all 1s ease-in-out;
        }
      }
    }

    .controls {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
    }
  }
}
</style>
