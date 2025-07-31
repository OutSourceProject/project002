<script setup>

import HomeBox from "@/views/homePage/components/HomeBox.vue";
</script>

<template>
  <div class="home-page">
    <HomeBox/>
  </div>
</template>

<style lang="scss" scoped>
.home-page{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }
}
</style>
