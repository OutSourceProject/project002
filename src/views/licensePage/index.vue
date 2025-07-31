<script setup>

import { Close } from "@element-plus/icons-vue";
import LicenseCarousel from "@/views/licensePage/components/LicenseCarousel.vue";
const goBack = () =>{
  window.history.back();
}
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
