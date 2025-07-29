<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';

let guideStartX;
let guideCurrentX;
const guideActiveIndex = ref(0);
const guideCarouselBoxRef = ref(null);
const guideCarouselRef = ref(null);
const guideHandleTouchStart = (e) => {
  guideStartX = e.touches[0].clientX;
  guideCurrentX = guideStartX;
};
const guideHandleTouchMove = (e) => {
  if (!guideStartX) {
    return;
  }
  guideCurrentX = e.touches[0].clientX;
};
const guideHandleTouchEnd = (e) => {
  if (!guideStartX) {
    return;
  }

  const diff = guideStartX - guideCurrentX;
  if (!diff) {
    return;
  }
  const threshold = 10;
  if (diff > threshold) {
    guideCarouselRef.value.next();
  } else if (diff < -threshold) {
    guideCarouselRef.value.prev();
  }
  guideStartX = 0;
  guideCurrentX = 0;
};
const guideCarouselChange = (current) => {
  guideActiveIndex.value = current;
};
onMounted(() => {
  nextTick(() => {
    if (guideCarouselBoxRef.value) {
      guideCarouselBoxRef.value.addEventListener('touchstart', guideHandleTouchStart);
      guideCarouselBoxRef.value.addEventListener('touchmove', guideHandleTouchMove);
      guideCarouselBoxRef.value.addEventListener('touchend', guideHandleTouchEnd);
    }
  });
});
onUnmounted(() => {
  if (guideCarouselBoxRef.value) {
    guideCarouselBoxRef.value.removeEventListener('touchstart', guideHandleTouchStart);
    guideCarouselBoxRef.value.removeEventListener('touchmove', guideHandleTouchMove);
    guideCarouselBoxRef.value.removeEventListener('touchend', guideHandleTouchEnd);
  }
});
</script>

<template>
  <div class="third-page">
    <div class="h-5"></div>
    <div class="w-full flex justify-between items-center px-6 box-border">
      <div class="w-8 h-5 flex flex-col gap-y-1"></div>
      <div class="h-5">
        <img alt="/" class="h-full w-auto" src="@/assets/images/snowflake-text001.png">
      </div>
    </div>
    <div class="h-6"></div>
    <div class="w-full box-border flex items-center justify-start">
      <span class="font-bold text-xl text-gray-700">关于我们</span>
    </div>
    <div class="w-full box-border flex items-center justify-start">
      <span class="text-xl text-gray-400">ABOUT US</span>
    </div>
    <div class="h-5"></div>
    <div
        ref="guideCarouselBoxRef"
        :class="['guide-carousel-box',{'arrow-left':guideActiveIndex=== 0},{'arrow-rigth':guideActiveIndex=== 3}]"
    >
      <el-carousel
          ref="guideCarouselRef"
          :activeIndex="guideActiveIndex"
          :autoplay="false"
          arrow="always"
          indicator-position="outside"
          @change="guideCarouselChange"
      >
        <el-carousel-item>
          <div class="guide-carousel-container">
            <div class="w-full flex items-center justify-center">
              <img alt="" class="w-full" src="@/assets/images/picture001.png"/>
            </div>
            <div class="h-5"></div>
            <div class="text-sm  text-gray-400 mb-3">
              <p class="text-xs">
                <span class="text-gray-900 mr-2 font-bold">羽丰羽绒制品有限公司</span>
                是一家集原材料收集、羽绒贸易的企业，拥有全自动羽毛水洗连续生产线，包括预分、除尘、水洗、干燥、冷却精分全套羽毛、羽绒检验设备及仪器。能按客户要求生产各种规格的优质鸭绒、水洗羽绒、毛片以及羽绒制品。
                <span class="text-gray-900 mr-2 font-bold">是目前国内产品品种较多、规模较大的羽绒生产企业之一。</span>
                公司近些年的健康发展，在原材料采购、市场开发、市场营销等项目上具有丰富的经验，并已具备稳定的产品质量保证体系和广阔的市场空间，并一直与多家品牌企业建立良好的合作关系。
              </p>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="guide-carousel-container">
            <div class="w-full flex items-center justify-start">
              <img alt="" class="w-full" src="@/assets/images/picture002.png"/>
            </div>
            <div class="h-5"></div>
            <div class="text-sm  text-gray-400 mb-3">
              <p class="text-xs">
                公司成立以来，始终恪守
                <span class="text-gray-900 mr-2 font-bold">“以质量求生存、以诚信求发展”</span>
                的经营理念，坚持诚信经营的宗旨，为广大客户提供质优价廉、最具竞争力的产品，赢得客户的信赖和好评。热忱欢迎国内外广大客户前来洽谈合作、共谋发展。
              </p>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="guide-carousel-container">
            <div class="w-full flex items-center justify-start">
              <img alt="" class="w-full" src="../../../assets/images/picture003.png"/>
            </div>
            <div class="h-5"></div>
            <div class="text-sm  text-gray-400 mb-3">
              <p class="text-xs">
                羽丰羽绒品牌焕新升级，重磅推出“溯羽系统”。该系统由【中国羽绒工业协会】会员企业羽丰羽绒有限公司研发运营，是
                <span class="text-gray-900 font-bold">【可追溯羽绒信息平台】</span>
                ，并已加入由中国羽绒工业协会主导的
                <span class="text-gray-900 font-bold">【全球羽绒追溯系统】。</span>
              </p>
              <div class="h-4"></div>
              <p class="text-xs">
                符合“溯羽安心羽绒”标准及技术要求、并通过溯羽系统实现全程追溯的羽绒材料，正式命名为
                <span class="text-gray-900 mr-2 font-bold">“溯羽安心羽绒”。</span>
              </p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="h-20"></div>
  </div>
</template>

<style lang="scss" scoped>
$guide-carousel-container-height: 450px;
.third-page {
  width: 100%;
  background: rgba(234, 234, 234, 1);
  height: 100%;
  max-width: 320px;
  margin: 0 auto;
  @apply relative;
  :deep(.el-dropdown) {
    outline: none;
  }

  .guide-carousel-box {
    position: relative;
    padding-bottom: 40px;
    box-sizing: border-box;

    .guide-carousel-container {
      height: $guide-carousel-container-height;
    }

    :deep(.el-carousel) {
      margin: 0 auto;
      position: static;

      .el-carousel__container {
        height: $guide-carousel-container-height;
      }

      .el-carousel__item {
        border-radius: 1rem;
      }

      .el-carousel__arrow {
        display: flex !important;
        background-color: transparent !important;
        border: 2px solid rgba(151, 203, 230, 1);
        color: rgba(151, 203, 230, 1);
        font-size: 20px;
        overflow: hidden;
        border-radius: 18px;
        -webkit-tap-highlight-color: transparent;
        outline: none;

        &.el-carousel__arrow--left {
          top: calc(100% + 10px);
          left: calc(50% - 46px);
        }

        &.el-carousel__arrow--right {
          top: calc(100% + 10px);
          left: calc(50% + 10px);
        }
      }

      .el-carousel__indicators--outside {
        display: none;
      }
    }
  }

  .arrow-left {
    :deep(.el-carousel) {
      .el-carousel__arrow {
        &.el-carousel__arrow--left {
          border-width: 1px;
        }
      }
    }
  }

  .arrow-rigth {
    :deep(.el-carousel) {
      .el-carousel__arrow {
        &.el-carousel__arrow--right {
          border-width: 1px;
        }
      }
    }
  }
}
</style>
