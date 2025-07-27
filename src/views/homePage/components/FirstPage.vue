<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { getDataFromUrl } from "@/tools/about-url.js";

const router = useRouter();
const urlQuery = ref({});
const goRetrospect = () => {
  router.push("/retrospect");
};
onMounted(() => {
  urlQuery.value = getDataFromUrl();
});
</script>

<template>
  <div class="first-page">
    <div class="fist-text">
      <img alt="" src="@/assets/images/text001.png"/>
    </div>
    <div class="h-36"></div>
    <div class="w-full flex items-center justify-center">
      <span class="font-bold text-sm">每一克的温暖·皆可溯源</span>
    </div>
    <div class="h-1"></div>
    <div class="w-full flex items-center justify-center">
      <span class="text-gray-400 text-sm">查看羽绒来源与检验检测报告</span>
    </div>
    <div class="h-4"></div>
    <div class="w-full flex items-center justify-center">
      <button class="w-7/12 border-none bg-white h-8 rounded-2xl">
        <span class="letter-space-2 text-gray-600 text-sm">{{ urlQuery.yrcode }}</span>
      </button>
    </div>
    <div class="h-20"></div>
    <div @click="goRetrospect">
      <div class="w-full flex items-center justify-center">
        <span class="text-gray-500 text-sm">立即追溯</span>
      </div>
      <div class="h-2"></div>
      <div class="w-full flex items-center justify-center">
        <div class="w-10 h-10 rounded-full border-2 border-solid border-color-001"></div>
      </div>
    </div>
    <div class="fixed bottom-20 w-full flex items-center justify-between px-10 box-border">
      <div class="w-10 h-10 flex items-center justify-start">
        <img alt="" class="w-full" src="@/assets/images/snowflake.png"/>
      </div>
      <div class="h-10 flex items-center justify-end">
        <span class="text-gray-400 text-sm letter-space-1">羽丰羽城</span>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.first-page {
  width: 100%;
  height: 100%;
  background: url("@/assets/images/first-bg.png");
  background-size: cover;

  .fist-text {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 40px;
    padding-top: 40px;
    box-sizing: border-box;

    img {
      width: 30vw;
    }
  }

  .letter-space-1 {
    letter-spacing: 5px;
  }
  .letter-space-2 {
    letter-spacing: 2px;
  }

  .border-color-001 {
    border-color: rgba(151, 203, 230, 1);
  }
}
</style>
