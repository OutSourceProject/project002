<script setup lang="ts">

import AboutBox from "@/views/aboutPage/components/AboutBox.vue";
</script>

<template>
<div class="about-me">
  <AboutBox />
</div>
</template>

<style scoped lang="scss">
.about-me {
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
