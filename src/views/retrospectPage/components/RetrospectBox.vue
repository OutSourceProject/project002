<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getDataFromUrl } from '@/tools/about-url.js';
import { useRetrospectRememberStore } from '@/stores/counter.js';
import axios from 'axios';
import CarouselTow from '@/views/retrospectPage/components/CarouselTow.vue';
import CarouselRetrospectThreee from '@/views/retrospectPage/components/CarouselRetrospectThreee.vue';
import CarouselOneVersion from '@/views/retrospectPage/components/CarouselOneVersion.vue';

const useRetrospectRemember = useRetrospectRememberStore();
const router = useRouter();
const popperOptions = {modifiers: [{name: 'offset', options: {offset: [50, 10]}}]};
const popperStyle = {
  borderRadius: '16px',
};
const yrcode = ref('');
const batchNumInfo = ref('');
const gbTb = ref(1);
const logo = ref('');
const executiveStandard = ref('');
const experimentalDetectionData = ref({
  downContent: '87.2',
  downContentRef: '85',
  bulkiness: '16.5',
  bulkinessRef: '16',
  cleanliness: '1000',
  cleanlinessRef: '500',
  downFeatherContent: '6.5',
  downFeatherContentRef: '10',
  landFowlFeather: '0',
  landFowlFeatherRef: '1.0',
  fatContent: '0.7',
  fatContentRef: '1.2',
  impurities: '0.2',
  impuritiesRef: '1.0',
  coloredDown: '0',
  coloredDownRef: '1.0',
  longHairedFilm: '0',
  longHairedFilmRef: '0',
});
const setScrollTop = () => {
  const homePage = document.getElementById('home_page');
  useRetrospectRemember.setPageScrollTop(homePage.scrollTop || 0);
};
const goReport = () => {
  setScrollTop();
  router.push('/report');
};
const goAbout = () => {
  setScrollTop();
  router.push('/about');
};
const goAboutMe = () => {
  setScrollTop();
  router.push('/aboutMe');
};
const goLicense = () => {
  setScrollTop();
  router.push('/license');
};
/**
 * 生成实验检测数据的样式
 * @param val {number} 实际值
 * @param total  {number} 标准值
 * @param last
 */
const getBgStyle = (val, total,last=0) => {
  const rightVal = Number(val) ? Number(val) : 0;
  const rightTotal = Number(total) ? Number(total) : 0;
  // 有一个为0就是都是白色
  if (!rightTotal || !rightVal) {
    return 'background: linear-gradient(to right,#ffffff 0%,#ffffff 100%);';
  }
  if (rightTotal === rightVal) {
    return 'background: linear-gradient(to right,#7e7e7e 0%,#7e7e7e 100%);';
  }
  if (rightVal > rightTotal) {
    const treaterPercent = (rightTotal / rightVal) * 90+last;
    return `background: linear-gradient(to right,#ffffff 0%,#ffffff ${Math.max(treaterPercent - 10, 0)}%,rgba(151, 203, 230, 1) ${Math.max(treaterPercent, 0)}%,rgba(151, 203, 230, 1) 100%);`;
  }
  const lessPercent = (rightVal / rightTotal) * 100+last;
  return `background: linear-gradient(to right,#7e7e7e 0%,#7e7e7e ${Math.max(lessPercent - 20, 0)}%,#ffffff ${Math.min(lessPercent, 100)}%,#ffffff 100%);`;
};
onMounted(() => {
  const urlQuery = getDataFromUrl();
  yrcode.value = urlQuery?.yrcode || '';
  getBatchInfo();
  getProductLogo();
  getExperimentalDetectionData();
});

const getBatchInfo = async () => {
  try {
    const params = new URLSearchParams({yrcode: yrcode.value});
    const response = await axios.get(`api/batchNumber/getBatchNumberPublic?${params}`);
    console.log(response.data.data.data);
    batchNumInfo.value = response.data.data.data.batchNum;
    gbTb.value = response.data.data.data.gbTb;
    executiveStandard.value = response.data.data.data.executiveStandard;
    console.log(batchNumInfo.value);
  } catch (error) {
    console.error('Error fetching batch info:', error);
    throw error;
  }
};

const getProductLogo = async () => {
  try {
    const params = new URLSearchParams({yrcode: yrcode.value});
    const response = await axios.get(`api/productLogo/getProductLogoPublic?${params}`);
    logo.value = response.data.data.data.logo;
  } catch (error) {
    console.error('Error fetching batch info:', error);
    throw error;
  }
};

const getExperimentalDetectionData = async () => {
  try {
    const params = new URLSearchParams({yrcode: yrcode.value});
    const response = await axios.get(
        `api/experimentalDetectionData/getExperimentalDetectionDataPublic?${params}`,
    );
    const data = response.data.data.data;

    if (data) {
      experimentalDetectionData.value = {
        downContent: data.downContent || '',
        downContentRef: data.downContentRef || '',
        bulkiness: data.bulkiness || '',
        bulkinessRef: data.bulkinessRef || '',
        cleanliness: data.cleanliness || '',
        cleanlinessRef: data.cleanlinessRef || '',
        downFeatherContent: data.downFeatherContent || '',
        downFeatherContentRef: data.downFeatherContentRef || '',
        landFowlFeather: data.landFowlFeather || '',
        landFowlFeatherRef: data.landFowlFeatherRef || '',
        fatContent: data.fatContent || '',
        fatContentRef: data.fatContentRef || '',
        impurities: data.impurities || '',
        impuritiesRef: data.impuritiesRef || '',
        coloredDown: data.coloredDown || '',
        coloredDownRef: data.coloredDownRef || '',
        longHairedFilm: data.longHairedFilm || '',
        longHairedFilmRef: data.longHairedFilmRef || '',
      };
    } else {
      console.error('No data returned from API.');
    }
  } catch (error) {
    console.error('Error fetching batch info:', error);
    throw error;
  }
};
watch(
    () => useRetrospectRemember.pageScrollTop,
    (val) => {
      nextTick(() => {
        if (document.getElementById('home_page')) {
          document.getElementById('home_page').scrollTop = val;
        }
      });
    },
    {immediate: true},
);
</script>

<template>
  <div class="second-page">
    <div class="swan-box"></div>
    <div class="h-7"></div>
    <div class="w-full flex justify-between items-center relative z-1 px-[33px] box-border">
      <el-popover
          :popper-options="popperOptions"
          :popper-style="popperStyle"
          :show-arrow="false"
          placement="bottom"
      >
        <div class="flex items-center justify-between" @click="goAboutMe">
          <img alt="" class="w-6" src="@/assets/images/avatar.png"/>
          <span class="font-bold color-999999 font-size-16 mr-3">关于我们</span>
        </div>
        <template #reference>
          <div class="w-8 h-5 flex flex-col gap-y-1">
            <div class="w-6 h-1 bg-white rounded"></div>
            <div class="w-6 h-1 bg-white rounded"></div>
          </div>
        </template>
      </el-popover>
      <div class="h-5">
        <img alt="/" class="h-full w-auto" src="@/assets/images/snowflake-text001.png"/>
      </div>
    </div>
    <div class="h-80"></div>
    <div class="h-10"></div>
    <div class="w-full flex justify-between items-center relative z-1 px-6 box-border">
      <div class="h-10 flex items-center justify-end">
        <img alt="" class="w-10" src="@/assets/images/snowflake.png"/>
      </div>
      <div class="h-10 flex items-center justify-end">
        <span class="text-white font-size-20 letter-space-1">羽丰羽绒</span>
      </div>
    </div>
    <div ref="carouselBoxRef" class="carousel-box">
      <CarouselOneVersion :batch-num-info="batchNumInfo" :executiveStandard="executiveStandard"/>
    </div>
    <div class="h-20"></div>
    <div class="h-5"></div>
    <div class="container-box relative z-1">
      <div class="container-width logo-container">
        <div class="w-1/3 flex items-center justify-center">
          <img :src="logo" alt="" class="w-full"/>
        </div>
        <div class="w-1/3 flex items-center justify-center">
          <img alt="" class="w-2" src="@/assets/images/icon-x@3x.png"/>
        </div>
        <div class="w-1/3 flex items-center justify-center">
          <img alt="" class="w-full" src="@/assets/images/snowflake-text002.png"/>
        </div>
      </div>
    </div>
    <div class="h-20"></div>
    <div class="h-5"></div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <span class="font-medium font-size-24 color-595757">实验检测数据</span>
      </div>
    </div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <span class="font-size-20 font-light color-999999 mt-2">EXPERIMENTAL TEST DATA</span>
      </div>
    </div>
    <div v-if="gbTb==1">
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >绒子含量<span class="ml-5">{{ experimentalDetectionData.downContent }}%</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≥{{ experimentalDetectionData.downContentRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
              :style="getBgStyle(experimentalDetectionData.downContent,experimentalDetectionData.downContentRef,-10)"
              class="w-full h-[6px] rounded-[6px]"
          ></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >蓬松度<span class="ml-5">{{ experimentalDetectionData.bulkiness }}cm</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≥{{ experimentalDetectionData.bulkinessRef }}cm</span
            >
          </div>
          <div class="h-1"></div>
          <div
              :style="getBgStyle(experimentalDetectionData.bulkiness,experimentalDetectionData.bulkinessRef,-10)"
              class="w-full h-[6px] rounded-[6px]"
          ></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >清洁度<span class="ml-5">{{ experimentalDetectionData.cleanliness }}mm</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≥{{ experimentalDetectionData.cleanlinessRef }}mm</span
            >
          </div>
          <div class="h-1"></div>
          <div
              :style="getBgStyle(experimentalDetectionData.cleanliness,experimentalDetectionData.cleanlinessRef)"
              class="w-full h-[6px] rounded-[6px]"
          ></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >绒丝+羽丝含量<span
                class="ml-5"
            >{{ experimentalDetectionData.downFeatherContent }}%</span
            ></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≤{{ experimentalDetectionData.downFeatherContentRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
              :style="getBgStyle(experimentalDetectionData.downFeatherContent,experimentalDetectionData.downFeatherContentRef)"
              class="w-full h-[6px] rounded-[6px]"
          ></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >陆禽毛<span
                class="ml-5"
            >{{ experimentalDetectionData.landFowlFeather }}%</span
            ></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≤{{ experimentalDetectionData.landFowlFeatherRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
              :style="getBgStyle(experimentalDetectionData.landFowlFeather,experimentalDetectionData.landFowlFeatherRef)"
              class="w-full h-[6px] rounded-[6px]"
          ></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >残脂率<span class="ml-5">{{ experimentalDetectionData.fatContent }}%</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≤{{ experimentalDetectionData.fatContentRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
              :style="getBgStyle(experimentalDetectionData.fatContent,experimentalDetectionData.fatContentRef)"
              class="w-full h-[6px] rounded-[6px]"
          ></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >杂质<span class="ml-5">{{ experimentalDetectionData.impurities }}%</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≤{{ experimentalDetectionData.impuritiesRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
              :style="getBgStyle(experimentalDetectionData.impurities,experimentalDetectionData.impuritiesRef)"
              class="w-full h-[6px] rounded-[6px]"
          ></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >异色毛绒<span class="ml-5">{{ experimentalDetectionData.coloredDown }}%</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≤{{ experimentalDetectionData.coloredDownRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
              :style="getBgStyle(experimentalDetectionData.coloredDown,experimentalDetectionData.coloredDownRef)"
              class="w-full h-[6px] rounded-[6px]"
          ></div>
        </div>
      </div>
    </div>
    <div v-if="gbTb==2">
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >绒子含量<span class="ml-5">{{ experimentalDetectionData.downContent }}%</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≥{{ experimentalDetectionData.downContentRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
            :style="getBgStyle(experimentalDetectionData.downContent,experimentalDetectionData.downContentRef,-10)"
            class="w-full h-[6px] rounded-[6px] bg-01"></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >蓬松度<span class="ml-5">{{ experimentalDetectionData.bulkiness }}cm</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≥{{ experimentalDetectionData.bulkinessRef }}cm</span
            >
          </div>
          <div class="h-1"></div>
          <div
            :style="getBgStyle(experimentalDetectionData.bulkiness,experimentalDetectionData.bulkinessRef,-10)"
            class="w-full h-[6px] rounded-[6px] bg-02"></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >清洁度<span class="ml-5">{{ experimentalDetectionData.cleanliness }}mm</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≥{{ experimentalDetectionData.cleanlinessRef }}mm</span
            >
          </div>
          <div class="h-1"></div>
          <div
            :style="getBgStyle(experimentalDetectionData.cleanliness,experimentalDetectionData.cleanlinessRef)"
            class="w-full h-[6px] rounded-[6px] bg-03"></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >陆禽毛<span
                class="ml-5"
            >{{ experimentalDetectionData.landFowlFeather }}%</span
            ></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≤{{ experimentalDetectionData.landFowlFeatherRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
            :style="getBgStyle(experimentalDetectionData.landFowlFeather,experimentalDetectionData.landFowlFeatherRef)"
            class="w-full h-[6px] rounded-[6px] bg-05"></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >残脂率<span class="ml-5">{{ experimentalDetectionData.fatContent }}%</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≤{{ experimentalDetectionData.fatContentRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
            :style="getBgStyle(experimentalDetectionData.fatContent,experimentalDetectionData.fatContentRef)"
            class="w-full h-[6px] rounded-[6px] bg-06"></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >杂质<span class="ml-5">{{ experimentalDetectionData.impurities }}%</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≤{{ experimentalDetectionData.impuritiesRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
            :style="getBgStyle(experimentalDetectionData.impurities,experimentalDetectionData.impuritiesRef)"
            class="w-full h-[6px] rounded-[6px] bg-07"></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >异色毛绒<span class="ml-5">{{ experimentalDetectionData.coloredDown }}%</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≤{{ experimentalDetectionData.coloredDownRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
            :style="getBgStyle(experimentalDetectionData.coloredDown,experimentalDetectionData.coloredDownRef)"
            class="w-full h-[6px] rounded-[6px] bg-08"></div>
        </div>
      </div>
    </div>
    <div v-if="gbTb==3">
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >绒子含量<span class="ml-5">{{ experimentalDetectionData.downContent }}%</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≥{{ experimentalDetectionData.downContentRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
            :style="getBgStyle(experimentalDetectionData.downContent,experimentalDetectionData.downContentRef,-10)"
            class="w-full h-[6px] rounded-[6px] bg-01"></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >蓬松度<span class="ml-5">{{ experimentalDetectionData.bulkiness }}cm</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≥{{ experimentalDetectionData.bulkinessRef }}cm</span
            >
          </div>
          <div class="h-1"></div>
          <div
            :style="getBgStyle(experimentalDetectionData.bulkiness,experimentalDetectionData.bulkinessRef,-10)"
            class="w-full h-[6px] rounded-[6px] bg-02"></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >长毛片<span
                class="ml-5"
            >{{ experimentalDetectionData.longHairedFilm }}%</span
            ></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≤{{ experimentalDetectionData.longHairedFilmRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
            :style="getBgStyle(experimentalDetectionData.longHairedFilm,experimentalDetectionData.longHairedFilmRef)"
            class="w-full h-[6px] rounded-[6px] bg-05"></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >杂质<span class="ml-5">{{ experimentalDetectionData.impurities }}%</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≤{{ experimentalDetectionData.impuritiesRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
            :style="getBgStyle(experimentalDetectionData.impurities,experimentalDetectionData.impuritiesRef)"
            class="w-full h-[6px] rounded-[6px] bg-06"></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >陆禽毛<span class="ml-5">{{ experimentalDetectionData.landFowlFeather }}%</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≤{{ experimentalDetectionData.landFowlFeatherRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
            :style="getBgStyle(experimentalDetectionData.landFowlFeather,experimentalDetectionData.landFowlFeatherRef)"
            class="w-full h-[6px] rounded-[6px] bg-06"></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >异色毛绒<span class="ml-5">{{ experimentalDetectionData.coloredDown }}%</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:≤{{ experimentalDetectionData.coloredDownRef }}%</span
            >
          </div>
          <div class="h-1"></div>
          <div
            :style="getBgStyle(experimentalDetectionData.coloredDown,experimentalDetectionData.coloredDownRef)"
            class="w-full h-[6px] rounded-[6px] bg-08"></div>
        </div>
      </div>
      <div class="h-14"></div>
      <div class="container-box relative z-1">
        <div class="container-width">
          <div class="w-full flex items-center justify-between">
            <span
                class="color-999999 font-size-16"
            >气味<span class="ml-5">无明显异味</span></span
            >
            <span
                class="color-999999 font-size-16"
            >标准参考值:无明显异味</span
            >
          </div>
          <div class="h-1"></div>
          <div
            :style="getBgStyle(0,0)"
            class="w-full h-[6px] rounded-[6px] bg-08"></div>
        </div>
      </div>
    </div>
    <div class="h-32"></div>
    <div class="container-box relative z-1">
      <div class="container-width">
        <img alt="" class="w-full" src="@/assets/images/border001.png"/>
      </div>
    </div>
    <div class="h-6"></div>
    <div class="container-box relative z-1">
      <div class="h-6"></div>
      <div class="container-width flex items-center justify-center gap-5">
        <div class="border-background w-20 h-20 flex items-center justify-center">
          <div class="font-size-16" @click="goReport">
            <p>查看</p>
            <p>报告</p>
          </div>
        </div>
        <div class="border-background w-20 h-20 flex items-center justify-center">
          <div class="font-size-16" @click="goAbout">
            <p>关于</p>
            <p>我们</p>
          </div>
        </div>
        <div class="border-background w-20 h-20 flex items-center justify-center">
          <div class="font-size-16" @click="goLicense">
            <p>查看</p>
            <p>证书</p>
          </div>
        </div>
      </div>
    </div>
    <div class="h-6"></div>
    <div class="container-box relative z-1">
      <div class="container-width">
        <img alt="" class="w-full" src="@/assets/images/border001.png"/>
      </div>
    </div>
    <div class="h-32"></div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <span class="font-medium font-size-24 color-595757">羽绒认证</span>
      </div>
    </div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <span class="font-size-20 font-light color-999999 mt-2">DOWN CERTIFICATION</span>
      </div>
    </div>
    <div class="h-4"></div>
    <div class="h-10"></div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <div class="w-1/4 flex items-center justify-start">
          <img alt="" class="w-2/3" src="@/assets/images/small-log001.png"/>
        </div>
        <div class="w-3/4">
          <p class="font-size-16 color-999999 leading-6">
            <span class="font-semibold color-595757 mr-1">中国羽绒工业协会</span>
            成立于1994年10月10日， 是由生产羽绒及羽绒制品的企业和相关事业
            单位自愿组成的社会团体，是隶属于国务院国有资产监督管理委员会的国家一级协会
            <span class="font-semibold color-595757 mr-1">羽丰羽绒有限公司</span>
            是中国羽绒工业协会会员。
          </p>
        </div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <div class="w-1/4 flex items-center justify-start">
          <img alt="" class="w-2/3" src="@/assets/images/small-log002.png"/>
        </div>
        <div class="w-3/4">
          <p class="font-size-16 color-999999 leading-6">
            <span class="font-semibold color-595757 mr-1">全球羽绒追溯系统</span>
            是由羽绒产业链各环节利益相关者共同参与，真实记录羽绒全产业链信息的第三方公共服务平台。中国羽协作为系统的管理主体和审核主体，充分利用互联网、大数据等先进技术创新服务方式，帮助参与企业提高管理水平与能力，提升羽绒信息追溯管理水平。
            <span class="font-semibold color-595757 mr-1">羽丰羽绒有限公司已加入该系统。</span>
          </p>
        </div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="container-box relative z-1">
      <div class="container-width flex items-center justify-start">
        <div class="w-1/4 flex items-center justify-start">
          <img alt="" class="w-2/3" src="@/assets/images/small-log003.png"/>
        </div>
        <div class="w-3/4">
          <p class="font-size-16 color-999999 leading-6">
            <span class="font-semibold color-595757 mr-1">责任羽绒标准（RDS）</span>
            是一项国际自愿性标准，针对鸭鹅供应链以及羽绒和羽毛原料从经认证的养殖场到最终产品的产业链进行监督管理，处理其中的动物福利问题。各场所由独立的第三方认证机构通过每年审核进行认证。确保提供羽绒和羽毛的供应链中的动物
            <span class="font-semibold color-595757 mr-1">
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
          <img alt="" class="w-2/3" src="@/assets/images/small-log004.png"/>
        </div>
        <div class="w-3/4">
          <p class="font-size-16 color-999999 leading-6">
            <span
                class="font-semibold color-595757 mr-1"
            >IDFB（International Down & Feather Bureau）</span
            >
            作为与世界各国羽绒相关机构合作的国际羽绒协会，积极开发并宣传各国的羽绒填充物标准，定期评估羽绒产品检测机构，
            <span class="font-semibold color-595757 mr-1">向消费者提供明确的标准。</span>
          </p>
        </div>
      </div>
    </div>
    <div style="min-height: 100vh">
      <div class="h-20"></div>
      <div class="container-box relative z-1">
        <div class="container-width flex items-center justify-start">
          <span class="font-medium font-size-24 color-595757">羽绒服养护指南</span>
        </div>
      </div>
      <div class="container-box relative z-1">
        <div class="container-width flex items-center justify-start">
          <span class="font-size-20 font-light color-999999 mt-2">DOWN JACKET CARE GUIDE</span>
        </div>
      </div>
      <div class="h-20"></div>
      <CarouselRetrospectThreee/>
      <div class="h-20"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    background: url('@/assets/images/swan.png');
    background-size: cover;
  }

  .carousel-box {
    position: relative;
    padding-top: 40px;
    box-sizing: border-box;
  }

  .container-box {
    width: 100%;
    display: flex;
    justify-content: center;

    .logo-container {
      @apply rounded-2xl flex items-center justify-between p-10 box-border;
      background: radial-gradient(
              circle,
              rgba(205, 205, 205, 0.1) 5%,
              rgba(255, 255, 255, 0.8) 100%
      );
    }

    .container-width {
      width: $container_width;

      .border-background {
        background-image: url('@/assets/images/border002.png');
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
