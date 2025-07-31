<script setup>

import { Close } from "@element-plus/icons-vue";
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
import { getDataFromUrl } from '@/tools/about-url.js';
import ReportCarousel from "@/views/reportPage/components/ReportCarousel.vue";

let startX;
let currentX;
const activeIndex = ref(0);
const carouselBoxRef = ref(null);
const carouselRef = ref(null);
const imageData = ref([]);
const yrcode = ref('');
const goBack = () => {
  window.history.back();
};
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
/**
 * 这里调用接口，获取图片
 */
const getImageList = async () => {
  try {
    const params = new URLSearchParams({yrcode: yrcode.value});
    const response = await axios.get(`api/report/getReportPublic?${params}`);
    imageData.value = response.data.data.data?.reportImages || [];
    console.log(imageData.value);
  } catch (error) {
    console.error('Error fetching getImageList info:', error);
    throw error;
  }
};


onMounted(() => {
  const urlQuery = getDataFromUrl();
  yrcode.value = urlQuery?.yrcode || localStorage.getItem("yrcode");
  console.log(localStorage.getItem("yrcode"));
  getImageList();
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
  <div class="report-page">
    <div class="box-border p-10 flex flex-col items-center justify-between w-full h-full">
      <div class="w-full flex items-center justify-start">
        <div class="w-10 h-10 flex items-center justify-center" @click="goBack">
          <el-icon :size="30" color="#999999">
            <Close/>
          </el-icon>
        </div>
      </div>
      <ReportCarousel :image-list="imageData"/>
      <div class="w-full h-10">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$carousel-container-height: 540px;
$container_width: calc(100vw - 80px);
.report-page {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background:linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 1) 100%);
  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }
}
</style>
