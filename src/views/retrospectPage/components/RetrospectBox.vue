<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import { useRouter } from "vue-router";
import { getDataFromUrl } from "@/tools/about-url.js";

const router = useRouter();
let startX;
let currentX;
let guideStartX;
let guideCurrentX;
const popperOptions = {modifiers: [{name: 'offset', options: {offset: [50, 10]}}]};
const popperStyle = {
  borderRadius: '16px',
};
const activeIndex = ref(0);
const guideActiveIndex = ref(0);
const carouselBoxRef = ref(null);
const guideCarouselBoxRef = ref(null);
const carouselRef = ref(null);
const guideCarouselRef = ref(null);
const urlQuery = ref({});
const handleTouchStart = (e) => {
  startX = e.touches[0].clientX;
  currentX = startX;
};
const handleTouchMove = (e) => {
  if (!startX) {
    return;
  }
  currentX = e.touches[0].clientX;
};
const handleTouchEnd = (e) => {
  if (!startX) {
    return;
  }

  const diff = startX - currentX;
  const threshold = 10;
  if (diff > threshold) {
    carouselRef.value.next();
  } else if (diff < -threshold) {
    carouselRef.value.prev();
  }
  startX = 0;
  currentX = 0;
};
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
const carouselChange = (current) => {
  activeIndex.value = current;
};
const guideCarouselChange = (current) => {
  guideActiveIndex.value = current;
};
const goReport = () => {
  router.push('/report');
};
const goAbout = () => {
  router.push('/about');
};
const goLicense = () => {
  router.push('/license');
};
onMounted(() => {
  urlQuery.value = getDataFromUrl();
  nextTick(() => {
    if (carouselBoxRef.value) {
      carouselBoxRef.value.addEventListener('touchstart', handleTouchStart);
      carouselBoxRef.value.addEventListener('touchmove', handleTouchMove);
      carouselBoxRef.value.addEventListener('touchend', handleTouchEnd);
    }
    if (guideCarouselBoxRef.value) {
      guideCarouselBoxRef.value.addEventListener('touchstart', guideHandleTouchStart);
      guideCarouselBoxRef.value.addEventListener('touchmove', guideHandleTouchMove);
      guideCarouselBoxRef.value.addEventListener('touchend', guideHandleTouchEnd);
    }
  });
});
onUnmounted(() => {
  if (carouselBoxRef.value) {
    carouselBoxRef.value.removeEventListener('touchstart', handleTouchStart);
    carouselBoxRef.value.removeEventListener('touchmove', handleTouchMove);
    carouselBoxRef.value.removeEventListener('touchend', handleTouchEnd);
  }
  if (guideCarouselBoxRef.value) {
    guideCarouselBoxRef.value.removeEventListener('touchstart', guideHandleTouchStart);
    guideCarouselBoxRef.value.removeEventListener('touchmove', guideHandleTouchMove);
    guideCarouselBoxRef.value.removeEventListener('touchend', guideHandleTouchEnd);
  }
});
</script>

<template>
  <div class="second-page">
    <div class="swan-box"></div>
    <div class="h-5"></div>
    <div class="w-full flex justify-between items-center relative z-1 px-6 box-border">
      <el-popover :popper-options="popperOptions" :popper-style="popperStyle" :show-arrow="false" placement="bottom">
        <div class="flex items-center justify-between" @click="goAbout">
          <img alt="" class="w-5" src="../../../assets/images/snowflake.png"/>
          <span class="font-bold text-gray-700 text-base mr-3">关于我们</span>
        </div>
        <template #reference>
          <div class="w-8 h-5 flex flex-col gap-y-1">
            <div class="w-6 h-1 bg-white rounded"></div>
            <div class="w-6 h-1 bg-white rounded"></div>
          </div>
        </template>
      </el-popover>
      <div class="h-5">
        <img alt="/" class="h-full w-auto" src="../../../assets/images/snowflake-text001.png">
      </div>
    </div>
    <div class="h-80"></div>
    <div class="h-10"></div>
    <div class="w-full flex justify-between items-center relative z-1 px-6 box-border">
      <div class="h-10 flex items-center justify-end">
        <img alt="" class="w-10" src="../../../assets/images/snowflake.png"/>
      </div>
      <div class="h-10 flex items-center justify-end">
        <span class="text-white text-sm letter-space-1">羽丰羽城</span>
      </div>
    </div>
    <div ref="carouselBoxRef" class="carousel-box">
      <el-carousel
          ref="carouselRef"
          :activeIndex="activeIndex"
          :autoplay="false"
          indicator-position="outside"
          @change="carouselChange"
      >
        <el-carousel-item>
          <div class="carousel-container">
            <div class="py-14">
              <p class="w-full text-center text-sm font-bold text-gray-900 mb-3">樱桃谷鸭</p>
              <p class="w-full text-center text-xs text-gray-400">批次号：LD359-90-9693</p>
              <p class="w-full text-center text-xs text-gray-400">原产地：中国山东</p>
              <p class="w-full text-center text-xs text-gray-400">执行标准：GB/T 14272-2021</p>
              <p class="w-full text-center text-xs text-gray-400">生产商：羽丰羽绒有限公司</p>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="carousel-container">
            <div class="py-14">
              <p class="w-full text-center text-sm font-bold text-gray-900 mb-3">樱桃谷鸭</p>
              <p class="w-full text-center text-xs text-gray-400">英国樱桃谷农场</p>
              <p class="w-full text-center text-xs text-gray-400">于20世纪50年代培育而成，</p>
              <p class="w-full text-center text-xs text-gray-400">其亲本为中国北京鸭与英国</p>
              <p class="w-full text-center text-xs text-gray-400">埃里斯伯里鸭。</p>
              <p class="w-full text-center text-xs text-gray-400">后经全球优质养殖区</p>
              <p class="w-full text-center text-xs text-gray-400">（如中国、欧洲等地）科学培育，</p>
              <p class="w-full text-center text-xs text-gray-400">目前是我国养殖量最大的鸭品种之一。</p>
              <p class="w-full text-center text-xs text-gray-400">其通体洁白、绒朵蓬大、纤维细腻，</p>
              <p class="w-full text-center text-xs text-gray-400">是高品质羽绒的优选原料之一。</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="h-20"></div>
    <div class="container-box relative z-1">
      <div class="container-width bg-white rounded-2xl flex items-center justify-between p-10 box-border">
        <div class="w-1/3 flex items-center justify-center">
          <img alt="" class="w-full" src="../../../assets/images/zhangyang.png"/>
        </div>
        <div class="w-1/3 flex items-center justify-center">
          <span class="text-gray-600 opacity-80">x</span>
        </div>
        <div class="w-1/3 flex items-center justify-center">
          <img alt="" class="w-full" src="../../../assets/images/snowflake-text002.png"/>
        </div>
      </div>
    </div>
    <div class="h-20"></div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <span class="font-medium text-base">实验检测数据</span>
      </div>
    </div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <span class="text-base font-light text-gray-500">EXPERIMENTAL TEST DATA</span>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="container-box relative z-1">
      <div class="container-width">
        <div class="w-full flex items-center justify-between">
          <span class="text-xs">绒子含量<span class="ml-5">87.2%</span></span>
          <span class="text-xs">标准参考值:≥85%</span>
        </div>
        <div class="h-1"></div>
        <div class="w-full h-[6px] rounded-[6px] bg-01"></div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="container-box relative z-1">
      <div class="container-width">
        <div class="w-full flex items-center justify-between">
          <span class="text-xs">蓬松度<span class="ml-5">16.5cm</span></span>
          <span class="text-xs">标准参考值:≥16cm</span>
        </div>
        <div class="h-1"></div>
        <div class="w-full h-[6px] rounded-[6px] bg-02"></div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="container-box relative z-1">
      <div class="container-width">
        <div class="w-full flex items-center justify-between">
          <span class="text-xs">清洁度<span class="ml-5">1000mm</span></span>
          <span class="text-xs">标准参考值:≥500mm</span>
        </div>
        <div class="h-1"></div>
        <div class="w-full h-[6px] rounded-[6px] bg-03"></div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="container-box relative z-1">
      <div class="container-width">
        <div class="w-full flex items-center justify-between">
          <span class="text-xs">羽绒+羽丝含量<span class="ml-5">6.5%</span></span>
          <span class="text-xs">标准参考值:≥10%</span>
        </div>
        <div class="h-1"></div>
        <div class="w-full h-[6px] rounded-[6px] bg-04"></div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="container-box relative z-1">
      <div class="container-width">
        <div class="w-full flex items-center justify-between">
          <span class="text-xs">陆禽毛<span class="ml-5">0%</span></span>
          <span class="text-xs">标准参考值:≥1.0%</span>
        </div>
        <div class="h-1"></div>
        <div class="w-full h-[6px] rounded-[6px] bg-05"></div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="container-box relative z-1">
      <div class="container-width">
        <div class="w-full flex items-center justify-between">
          <span class="text-xs">残脂率<span class="ml-5">0.7%</span></span>
          <span class="text-xs">标准参考值:≥1.2%</span>
        </div>
        <div class="h-1"></div>
        <div class="w-full h-[6px] rounded-[6px] bg-06"></div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="container-box relative z-1">
      <div class="container-width">
        <div class="w-full flex items-center justify-between">
          <span class="text-xs">杂质<span class="ml-5">0.2%</span></span>
          <span class="text-xs">标准参考值:≤1.0%</span>
        </div>
        <div class="h-1"></div>
        <div class="w-full h-[6px] rounded-[6px] bg-07"></div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="container-box relative z-1">
      <div class="container-width">
        <div class="w-full flex items-center justify-between">
          <span class="text-xs">异色毛绒<span class="ml-5">0%</span></span>
          <span class="text-xs">标准参考值:≤1.0%</span>
        </div>
        <div class="h-1"></div>
        <div class="w-full h-[6px] rounded-[6px] bg-08"></div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="h-6"></div>
    <div class="container-box relative z-1">
      <div class="container-width">
        <img alt="" class="w-full" src="../../../assets/images/border001.png">
      </div>
    </div>
    <div class="h-6"></div>
    <div class="container-box relative z-1">
      <div class="h-6"></div>
      <div class="container-width flex items-center justify-center gap-5">
        <div class="border-background w-14 h-14 flex items-center justify-center">
          <div class="text-xs" @click="goReport">
            <p>查看</p>
            <p>报告</p>
          </div>
        </div>
        <div class="border-background w-14 h-14 flex items-center justify-center">
          <div class="text-xs" @click="goAbout">
            <p>关于</p>
            <p>我们</p>
          </div>
        </div>
        <div class="border-background w-14 h-14 flex items-center justify-center">
          <div class="text-xs" @click="goLicense">
            <p>查看</p>
            <p>证书</p>
          </div>
        </div>
      </div>
    </div>
    <div class="h-6"></div>
    <div class="container-box relative z-1">
      <div class="container-width">
        <img alt="" class="w-full" src="../../../assets/images/border001.png">
      </div>
    </div>
    <div class="h-10"></div>
    <div class="h-6"></div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <span class="font-medium text-base">羽绒认证</span>
      </div>
    </div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <span class="text-base font-light text-gray-500">DOWN CERTIFICATION</span>
      </div>
    </div>
    <div class="h-4"></div>
    <div class="h-10"></div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <div class="w-1/4 flex items-center justify-start">
          <img alt="" class="w-2/3" src="../../../assets/images/small-log001.png"/>
        </div>
        <div class="w-3/4">
          <p class="text-xs text-gray-500">
            <span class="font-semibold text-gray-900 mr-1">中国羽绒工业协会</span>
            成立于1994年10月10日， 是由生产羽绒及羽绒制品的企业和相关事业 单位自愿组成的社会团体，是隶属于国务院国有资产监督管理委员会的国家一级协会
            <span class="font-semibold text-gray-900 mr-1">羽丰羽绒有限公司</span>
            是中国羽绒工业协会会员。
          </p>
        </div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <div class="w-1/4 flex items-center justify-start">
          <img alt="" class="w-2/3" src="../../../assets/images/small-log002.png"/>
        </div>
        <div class="w-3/4">
          <p class="text-xs text-gray-500">
            <span class="font-semibold text-gray-900 mr-1">全球羽绒追溯系统</span>
            是由羽绒产业链各环节利益相关者共同参与，真实记录羽绒全产业链信息的第三方公共服务平台。中国羽协作为系统的管理主体和审核主体，充分利用互联网、大数据等先进技术创新服务方式，帮助参与企业提高管理水平与能力，提升羽绒信息追溯管理水平。
            <span class="font-semibold text-gray-900 mr-1">羽丰羽绒有限公司已加入该系统。</span>
          </p>
        </div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <div class="w-1/4 flex items-center justify-start">
          <img alt="" class="w-2/3" src="../../../assets/images/small-log003.png"/>
        </div>
        <div class="w-3/4">
          <p class="text-xs text-gray-500">
            <span class="font-semibold text-gray-900 mr-1">责任羽绒标准（RDS））</span>
            是一项国际自愿性标准，针对鸭鹅供应链以及羽绒和羽毛原料从经认证的养殖场到最终产品的产业链进行监督管理，处理其中的动物福利问题。各场所由独立的第三方认证机构通过每年审核进行认证。确保提供羽绒和羽毛的供应链中的动物
            <span class="font-semibold text-gray-900 mr-1">
              没有遭受任何不必要的伤害，不存在活拔，强行喂食等虐待行为。
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <div class="w-1/4 flex items-center justify-start">
          <img alt="" class="w-2/3" src="../../../assets/images/small-log004.png"/>
        </div>
        <div class="w-3/4">
          <p class="text-xs text-gray-500">
            <span class="font-semibold text-gray-900 mr-1">IDFB（International Down & Feather Bureau）</span>
            作为与世界各国羽绒相关机构合作的国际羽绒协会，积极开发并宣传各国的羽绒填充物标准，定期评估羽绒产品检测机构，
            <span class="font-semibold text-gray-900 mr-1">向消费者提供明确的标准。</span>
          </p>
        </div>
      </div>
    </div>
    <div class="h-20"></div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <span class="font-medium text-base">羽绒服养护指南</span>
      </div>
    </div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <span class="text-base font-light text-gray-500">DOWN JACKET CARE GUIDE</span>
      </div>
    </div>
    <div class="h-20"></div>
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
            <div class="w-full flex items-center justify-start">
              <img alt="" class="w-16" src="../../../assets/images/icon001.png"/>
            </div>
            <div class="h-2"></div>
            <div class="w-full flex items-center justify-start font-bold text-xl">
              <span>手洗</span>
            </div>
            <div class="w-full flex items-center justify-start font-bold text-xl">
              <span>Hand Washing</span>
            </div>
            <div class="h-5"></div>
            <div class="text-sm  text-gray-400 mb-3">
              <p>用35℃温水搭配中性洗涤剂轻揉袖口、领口等易脏部位避免用力拧干可用毛巾按压吸水。</p>
            </div>
            <div class="text-sm  text-gray-600 mb-3">
              <p>清洁方法</p>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="guide-carousel-container">
            <div class="w-full flex items-center justify-start">
              <img alt="" class="w-16" src="../../../assets/images/icon001.png"/>
            </div>
            <div class="h-2"></div>
            <div class="w-full flex items-center justify-start font-bold text-xl">
              <span>机洗</span>
            </div>
            <div class="w-full flex items-center justify-start font-bold text-xl">
              <span>Machine Washable</span>
            </div>
            <div class="h-5"></div>
            <div class="text-sm  text-gray-400 mb-3">
              <p>仅限标注可机洗的款式，选择轻柔模式并使用专用洗涤剂洗后立即取出晾干。</p>
            </div>
            <div class="text-sm  text-gray-600 mb-3">
              <p>清洁方法</p>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="guide-carousel-container">
            <div class="w-full flex items-center justify-start">
              <img alt="" class="w-16" src="../../../assets/images/icon001.png"/>
            </div>
            <div class="h-2"></div>
            <div class="w-full flex items-center justify-start font-bold text-xl">
              <span>局部清洁</span>
            </div>
            <div class="w-full flex items-center justify-start font-bold text-xl">
              <span>Localized Cleaningg</span>
            </div>
            <div class="h-5"></div>
            <div class="text-sm  text-gray-400 mb-3">
              <p>轻微污渍用羽绒服专用清洁剂擦拭，油渍先用卸妆湿巾处理再清洗。</p>
            </div>
            <div class="text-sm  text-gray-600 mb-3">
              <p>清洁方法</p>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="guide-carousel-container">
            <div class="w-full flex items-center justify-start">
              <img alt="" class="w-16" src="../../../assets/images/icon001.png"/>
            </div>
            <div class="h-2"></div>
            <div class="w-full flex items-center justify-start font-bold text-xl">
              <span>存储要点</span>
            </div>
            <div class="w-full flex items-center justify-start font-bold text-xl">
              <span>Storage Essentials</span>
            </div>
            <div class="h-5"></div>
            <div class="text-sm  text-gray-400 mb-3">
              <p>完全干燥后折看或悬挂存放避免压缩。使用防尘罩或通风收纳袋，南方梅雨季每月晾晒通风。</p>
            </div>
            <div class="text-sm  text-gray-400 mb-3">
              <p></p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="h-20"></div>
  </div>
</template>

<style lang="scss" scoped>
$carousel-container-height: 240px;
$guide-carousel-container-height: 300px;
$container_width: calc(100vw - 80px);
.second-page {
  width: 100%;
  background: rgba(234, 234, 234, 1);
  @apply relative;

  .swan-box {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 100vh;
    height: 100vh;
    z-index: 0;
    background: url("@/assets/images/swan.png");
    background-size: cover;
  }

  .carousel-box {
    position: relative;
    padding-top: 40px;
    box-sizing: border-box;

    .carousel-container {
      width: $container_width;
      height: $carousel-container-height;
      background: linear-gradient(#eaeaea, #ffffff);
      @apply rounded-2xl flex items-center justify-center;
    }

    :deep(.el-carousel) {
      width: calc(100vw - 80px);
      margin: 0 auto;
      position: static;

      .el-carousel__container {
        height: $carousel-container-height;
      }

      .el-carousel__item {
        border-radius: 1rem;
      }

      .el-carousel__arrow {
        display: none;
      }

      .el-carousel__indicators--outside {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        display: flex;
        height: 40px;
        align-items: flex-start;
        justify-content: center;

        .el-carousel__indicator--horizontal {
          background-color: transparent !important;
          opacity: 1 !important;
          cursor: none;

          .el-carousel__button {
            background-color: white;
            width: 6px;
            height: 6px;
            border-radius: 3px;
          }

          &.is-active {
            .el-carousel__button {
              width: 80px;
            }
          }
        }

      }
    }
  }

  .guide-carousel-box {
    position: relative;
    padding-bottom: 40px;
    box-sizing: border-box;

    .guide-carousel-container {
      width: $container_width;
      height: $guide-carousel-container-height;
      background: linear-gradient(#ffffff, #ffffff);
      @apply rounded-2xl p-10 box-border;
    }

    :deep(.el-carousel) {
      width: calc(100vw - 80px);
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

  .container-box {
    width: 100%;
    display: flex;
    justify-content: center;

    .container-width {
      width: $container_width;

      .bg-01 {
        background: linear-gradient(to right, #ffffff 0%, #ffffff 56%, #ffffff 70.2%, rgba(151, 203, 230, 1) 90%, rgba(151, 203, 230, 1) 100%);
      }

      .bg-02 {
        background: linear-gradient(to right, #ffffff 0%, #ffffff 56%, #ffffff 60.2%, rgba(151, 203, 230, 1) 80%, rgba(151, 203, 230, 1) 100%);
      }

      .bg-03 {
        background: linear-gradient(to right, #ffffff 0%, #ffffff 45%, #ffffff 46.2%, rgba(151, 203, 230, 1) 50%, rgba(151, 203, 230, 1) 100%);
      }

      .bg-04 {
        background: linear-gradient(to right, #7e7e7e 0%, #7e7e7e 45%, #7e7e7e 55%, #ffffff 75%, #ffffff 100%);
      }

      .bg-05 {

        background: linear-gradient(to right, #ffffff 0%, #ffffff 45%, #ffffff 55%, #ffffff 75%, #ffffff 100%);
      }

      .bg-06 {
        background: linear-gradient(to right, #7e7e7e 0%, #7e7e7e 45%, #ffffff 55%, #ffffff 100%);
      }

      .bg-07 {
        background: linear-gradient(to right, #7e7e7e 0%, #7e7e7e 1%, #ffffff 10%, #ffffff 100%);
      }

      .bg-08 {
        background: linear-gradient(to right, #7e7e7e 0%, #7e7e7e 5%, #ffffff 20%, #ffffff 100%);
      }

      .border-background {
        background-image: url("@/assets/images/border002.png");
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
