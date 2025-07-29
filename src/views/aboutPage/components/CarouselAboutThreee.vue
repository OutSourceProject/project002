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
  <div class="carousel-about-threee">
    <div ref="carouselRef" class="carousel-about-container">
      <div class="guide-carousel-container">
        <div class="w-full flex items-center justify-center">
          <img alt="" class="w-full" src="@/assets/images/picture001.png"/>
        </div>
        <div class="h-5"></div>
        <div class="mb-3">
          <p class="font-size-16 color-999999 leading-5">
            <span class="color-595757 mr-2 font-bold">羽丰羽绒制品有限公司</span>
            是一家集原材料收集、羽绒贸易的企业，拥有全自动羽毛水洗连续生产线，包括预分、除尘、水洗、干燥、冷却精分全套羽毛、羽绒检验设备及仪器。能按客户要求生产各种规格的优质鸭绒、水洗羽绒、毛片以及羽绒制品。
            <span class="color-595757 mr-2 font-bold">是目前国内产品品种较多、规模较大的羽绒生产企业之一。</span>
            公司近些年的健康发展，在原材料采购、市场开发、市场营销等项目上具有丰富的经验，并已具备稳定的产品质量保证体系和广阔的市场空间，并一直与多家品牌企业建立良好的合作关系。
          </p>
        </div>
      </div>
      <div class="guide-carousel-container">
        <div class="w-full flex items-center justify-start">
          <img alt="" class="w-full" src="@/assets/images/picture002.png"/>
        </div>
        <div class="h-5"></div>
        <div class="mb-3">
          <p class="font-size-16 color-999999 leading-5">
            公司成立以来，始终恪守
            <span class="color-595757 mr-2 font-bold">“以质量求生存、以诚信求发展”</span>
            的经营理念，坚持诚信经营的宗旨，为广大客户提供质优价廉、最具竞争力的产品，赢得客户的信赖和好评。热忱欢迎国内外广大客户前来洽谈合作、共谋发展。
          </p>
        </div>
      </div>
      <div class="guide-carousel-container">
        <div class="w-full flex items-center justify-start">
          <img alt="" class="w-full" src="@/assets/images/picture003.png"/>
        </div>
        <div class="h-5"></div>
        <div class="mb-3">
          <p class="font-size-16 color-999999 leading-5">
            羽丰羽绒品牌焕新升级，重磅推出“溯羽系统”。该系统由【中国羽绒工业协会】会员企业羽丰羽绒有限公司研发运营，是
            <span class="color-595757 font-bold">【可追溯羽绒信息平台】</span>
            ，并已加入由中国羽绒工业协会主导的
            <span class="text-gray-900 font-bold">【全球羽绒追溯系统】。</span>
          </p>
          <div class="h-4"></div>
          <p class="font-size-16 color-999999 leading-5">
            符合“溯羽安心羽绒”标准及技术要求、并通过溯羽系统实现全程追溯的羽绒材料，正式命名为
            <span class="color-595757 mr-2 font-bold">“溯羽安心羽绒”。</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel-about-threee {
  overflow: hidden;
  width: 100%;

  .carousel-about-container {
    transform: v-bind(translateVal);
    transition: transform .4s ease-in-out;
    width: calc(300vw - 60px);
    @apply flex;
    .guide-carousel-container {
      width: calc(100vw - 100px);
      background: linear-gradient(#ffffff, #ffffff);
      @apply rounded-2xl pt-10 px-6 pb-6 box-border;
    }

    .guide-carousel-container + .guide-carousel-container {
      margin-left: 30px;
    }

  }

}
</style>
