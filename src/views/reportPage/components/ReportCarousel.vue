<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import ArrowsButton from '@/components/ArrowsButton.vue'

const props = defineProps({
  imageList: {
    type: Array,
    required: true
  }
})

let startX
let currentX
const carouselTrackRef = ref(null)
const currentIndex = ref(0)

const updateCarousel = () => {
  if (carouselTrackRef.value) {
    carouselTrackRef.value.style.transform = `translateX(-${currentIndex.value * 100}%)`
  }
}

// 下一张幻灯片
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.imageList.length
  updateCarousel()
}

// 上一张幻灯片
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.imageList.length) % props.imageList.length
  updateCarousel()
}

const handleTouchStart = (e) => {
  startX = e.touches[0].clientX
  currentX = startX
}

const handleTouchMove = (e) => {
  if (!startX) return
  currentX = e.touches[0].clientX
}

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
  moveHandle()
}

const rightHandle = () => {
  moveHandle()
}

const handleTouchEnd = (e) => {
  if (!startX) return

  const diff = startX - currentX
  const threshold = 50

  if (diff > threshold) {
    rightHandle()
  } else if (diff < -threshold) {
    leftHandle()
  }

  startX = 0
  currentX = 0
}

onMounted(() => {
  nextTick(() => {
    if (carouselTrackRef.value) {
      carouselTrackRef.value.addEventListener('touchstart', handleTouchStart)
      carouselTrackRef.value.addEventListener('touchmove', handleTouchMove)
      carouselTrackRef.value.addEventListener('touchend', handleTouchEnd)
    }
  })
})

onUnmounted(() => {
  if (carouselTrackRef.value) {
    carouselTrackRef.value.removeEventListener('touchstart', handleTouchStart)
    carouselTrackRef.value.removeEventListener('touchmove', handleTouchMove)
    carouselTrackRef.value.removeEventListener('touchend', handleTouchEnd)
  }
})
</script>

<template>
  <div class="elementary-carousel-example">
    <div class="carousel-container">
      <div class="carousel-content">
        <div ref="carouselTrackRef" class="carousel-track">
          <div v-for="(image, i) in imageList" :key="`image_${i}`" class="carousel-item">
            <div class="item-content">
              <div class="w-full flex items-center justify-center">
                <img :src="image" alt="" class="w-full" />
              </div>
              <div v-if="i === 0" class="w-full flex items-center justify-center mt-5">
                <span class="color-999999 font-size-16">(本报告仅限本批次羽绒原始状态)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="controls">
        <ArrowsButton
          :active-index="currentIndex"
          :total="imageList.length - 1"
          color="#999999"
          @left="leftHandle"
          @right="rightHandle"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.elementary-carousel-example {
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  width: 100%;
  overflow: hidden;

  .carousel-container {
    max-width: 1200px;
    width: 100%;

    .carousel-content {
      .carousel-track {
        display: flex;
        height: 100%;
        transition: transform 0.6s ease-in-out;
        .carousel-item {
          min-width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .item-content {
            max-width: 600px;
            text-align: center;
          }
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
