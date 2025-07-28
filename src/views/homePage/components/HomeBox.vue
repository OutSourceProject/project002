<script setup>
import { ref,onMounted,watch } from 'vue';
import { useRouter } from "vue-router";
import { getDataFromUrl } from "@/tools/about-url.js";
import { useRetrospectRememberStore } from "@/stores/counter.js";
const useRetrospectRemember = useRetrospectRememberStore()
const router = useRouter();
const yrcode = ref('');
const goRetrospect = () => {
  useRetrospectRemember.setPageScrollTop(0)
  router.push({
    path: "/retrospect",
    query: {yrcode: yrcode.value}
  });
};
onMounted(() => {
  const urlQuery = getDataFromUrl();
  yrcode.value = urlQuery?.yrcode || ''
})
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
      <el-input v-model="yrcode" placeholder="请输入" style="width: 240px"/>
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
        <span class="text-gray-400 text-sm letter-space-1">羽丰羽绒</span>
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
  .border-color-001 {
    border-color: rgba(151, 203, 230, 1);
  }
  :deep(.el-input__wrapper){
    border-radius: 16px;
    border-color: white;
    outline: none;
    box-shadow: none;
    &.is-focus{
      border-color: white;
      box-shadow: none;
    }
    .el-input__inner{
      text-align: center;
      letter-spacing: 2px;
    }
  }
}
</style>
