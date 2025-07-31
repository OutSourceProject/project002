<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import ArrowsButton from '@/components/ArrowsButton.vue'

let startX
let currentX
const carouselTrackRef = ref(null)
const currentIndex = ref(0)
const totalItems = 2
const updateCarousel = () => {
  if (carouselTrackRef.value) {
    carouselTrackRef.value.style.transform = `translateX(-${currentIndex.value * 100}%)`
  }
}

// 下一张幻灯片
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % totalItems
  updateCarousel()
}
// 上一张幻灯片
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + totalItems) % totalItems
  updateCarousel()
}

const handleTouchStart = (e) => {
  startX = e.touches[0].clientX
  currentX = startX
}
const handleTouchMove = (e) => {
  if (!startX) {
    return
  }
  currentX = e.touches[0].clientX
}
const leftHandle = () => {
  if ([1].includes(currentIndex.value)) {
    prevSlide()
  }
}
const rightHandle = () => {
  if ([0].includes(currentIndex.value)) {
    nextSlide()
  }
}
const handleTouchEnd = (e) => {
  if (!startX) {
    return
  }
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
          <div class="carousel-item">
            <div class="item-content">
              <div class="w-full flex items-center justify-center">
                <img alt="" class="w-60" src="@/assets/images/license001.jpg"/>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="item-content">
              <div class="w-full flex items-center justify-center">
                <img alt="" class="w-full" src="@/assets/images/license002.png"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="controls">
        <ArrowsButton
          :active-index="currentIndex"
          :total="totalItems - 1"
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
