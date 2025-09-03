<script setup>
import { ref,onBeforeMount } from 'vue';
import { useRouter } from "vue-router";
import { getDataFromUrl } from "@/tools/about-url.js";
import { useRetrospectRememberStore } from "@/stores/counter.js";
//import axios from 'axios';
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

onBeforeMount(() => {
  const urlQuery = getDataFromUrl();
  yrcode.value = urlQuery?.yrcode || ''
  localStorage.setItem("yrcode",yrcode.value)
  //getDomainInfo()
})

/*const getDomainInfo = async () => {
  try {
    const params = new URLSearchParams({ yrcode: yrcode.value });
    const response = await axios.get(`api/domainRedirect/getDomainRedirectPublic?${params}`);

    // 提取 domain，并移除可能的 http:// 或 https:// 前缀
    let domain = response.data.data.data.domain;

    // 移除 http:// 或 https:// 前缀（如果存在）
    domain = domain.replace(/^https?:\/\//i, '');

    // 确保 domain 不带路径（如 baidu.com/xxx → baidu.com）
    domain = domain.split('/')[0];

    // 拼接成完整的 URL（默认用 https）
    const targetUrl = `https://${domain}?yrcode=${yrcode.value}`;

    console.log('Redirecting to:', targetUrl);
    window.location.href = targetUrl;
  } catch (error) {
    console.error('Error fetching domain info:', error);
    throw error;
  }
};*/

</script>

<template>
  <div class="first-page">
    <div class="fist-text">
<!--      <img alt="" src="@/assets/images/text001.png" class="w-[140px]"/>-->
    </div>
    <div class="h-36"></div>
    <div class="w-full flex items-center justify-center">
      <span class="font-normal font-size-24 color-595757">每一克的温暖·皆可溯源</span>
    </div>
    <div class="h-4"></div>
    <div class="w-full flex items-center justify-center">
      <span class="color-999999 font-size-20 font-light">查看羽绒来源与检验检测报告</span>
    </div>
    <div class="h-4"></div>
    <div class="w-full flex items-center justify-center ">
      <el-input v-model="yrcode" placeholder="请输入"  class="w-64 font-size-20" readonly/>
    </div>
    <div class="h-12"></div>
    <div class="h-8"></div>
    <div @click="goRetrospect">
      <div class="w-full flex items-center justify-center">
        <span class="text-gray-500 font-size-20">更多详情，请点击</span>
      </div>
      <div class="h-2"></div>
      <div class="w-full flex items-center justify-center">
        <div class="w-16 h-16 rounded-full border-2 border-solid border-color-001"></div>
      </div>
    </div>
    <div class="fixed bottom-20 w-full flex items-center justify-between px-[33px] box-border">
      <div class="w-12 h-12 flex items-center justify-start">
        <img alt="" class="w-full" src="@/assets/images/snowflake.png"/>
      </div>
      <div class="h-12 flex items-center justify-end">
        <span class="color-999999 font-size-20 letter-space-1"></span>
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
    padding-right: 33px;
    padding-top: 28px;
    box-sizing: border-box;

    img {
      width: 30vw;
    }
  }

  .letter-space-1 {
    letter-spacing: 5px;
  }
  .border-color-001 {
    border-color: #97cbe6;
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
      font-size: 20px;
    }
  }
}
</style>
