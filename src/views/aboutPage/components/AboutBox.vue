<script setup>
import CarouselAboutThreee from "@/views/aboutPage/components/CarouselAboutThreee.vue";
</script>

<template>
  <div class="third-page">
    <div class="h-5"></div>
    <div class="w-full flex justify-between items-center box-border pr-10">
      <div class="w-8 h-5 flex flex-col gap-y-1"></div>
      <div class="h-5">
        <img alt="/" class="h-full w-auto" src="@/assets/images/snowflake-text001.png">
      </div>
    </div>
    <div class="h-6"></div>
    <div class="w-full box-border flex items-center justify-start">
      <span class="font-bold font-size-24 color-595757">关于我们</span>
    </div>
    <div class="h-2"></div>
    <div class="w-full box-border flex items-center justify-start">
      <span class="font-size-24 color-999999">ABOUT US</span>
    </div>
    <div class="h-5"></div>
    <CarouselAboutThreee/>
    <div class="h-20"></div>
  </div>
</template>

<style lang="scss" scoped>
$guide-carousel-container-height: 580px;
.third-page {
  background: rgba(234, 234, 234, 1);
  height: 100%;
  margin: 0 auto 0 40px;
  width: calc(100vw - 40px);
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
