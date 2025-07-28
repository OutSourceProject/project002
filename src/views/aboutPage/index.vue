<script setup>
import { Close } from '@element-plus/icons-vue';
const goBack = () =>{
  window.history.back();
}
</script>

<template>
  <div class="about-page">
    <div class="box-border p-10 flex flex-col items-center justify-between w-full h-full">
      <div class="w-full flex items-center justify-start">
        <div class="w-10 h-10 flex items-center justify-center" @click="goBack">
          <el-icon :size="30" color="#999999">
            <Close/>
          </el-icon>
        </div>
      </div>
      <div class="w-full">
        <video class="w-full" controls autoplay>
          <source src="../../assets/video/about.mp4" type="video/mp4">
          您的浏览器不支持 video 标签。
        </video>
        <div class="h-10"></div>
        <p class="text-xs text-gray-500 font-light">
          羽丰羽绒制品有限公司是一家集原材料收集、羽绒贸易的企业，拥有全自动羽毛水洗连续生产线，包括预分、除尘、水洗、干燥、冷却精分全套羽毛、羽绒检验设备及仪器。能按客户要求生产各种规格的优质鸭绒、水洗羽绒、毛片以及羽绒制品。是目前国内产品品种较多、规模较大的羽绒生产企业之一。公司近些年的健康发展，在原材料采购、市场开发、市场营销等项目上具有丰富的经验，并已具备稳定的产品质量保证体系和广阔的市场空间，并一直与多家品牌企业建立良好的合作关系。公司成立以来，始终恪守“以质量求生存、以诚信求发展”的经营理念，坚持诚信经营的宗旨，为广大客户提供质优价廉、最具竞争力的产品，赢得客户的信赖和好评。热忱欢迎国内外广大客户前来洽谈合作、共谋发展。
        </p>
      </div>
      <div class="w-full flex items-center justify-center pb-5">
        <span class="text-sm text-gray-500 font-light">羽丰羽绒</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-page {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background: rgba(234, 234, 234, 1);
}
</style>
