<script setup>

import FirstPage from "@/views/homePage/components/FirstPage.vue";
import SecondPage from "@/views/homePage/components/SecondPage.vue";
</script>

<template>
  <div class="home-page">
    <SecondPage/>
  </div>
</template>

<style lang="scss" scoped>
.home-page{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
