<script setup>
import {computed} from 'vue'
const props = defineProps({
  activeIndex: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: false,
    default: '#97cbe6'
  },
});
const emits = defineEmits(['left', 'right']);
const buttonColor = computed(() => props.color);
const leftClick = () => {
  emits('left');
};
const rightClick = () => {
  emits('right');
};
</script>

<template>
  <div class="arrows-button">
    <div :class="['left-arrow',{'is-active':activeIndex!==0}]" @click="leftClick">
      <svg
          v-if="activeIndex!==0" height="1024" version="1.1" viewBox="0 0 1024 1024" width="1024"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M730.026734 0c18.713977 0 37.429954 7.144991 51.714937 21.429974 28.570965 28.572965 28.570965 74.857909 0 103.426874L394.527143 511.999375l387.214528 387.142527c28.570965 28.536965 28.570965 74.857909 0 103.428874s-74.857909 28.570965-103.428874 0L239.314333 563.713312C225.59935 549.999329 217.886359 531.427351 217.886359 511.999375s7.712991-37.999954 21.427974-51.713937L678.311797 21.427974C692.59778 7.143991 711.312757 0 730.026734 0z"
        ></path>
      </svg>
      <svg v-else height="1024" version="1.1" viewBox="0 0 1024 1024" width="1024" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M312.889 995.556c-17.067 0-28.445-5.69-39.822-17.067-22.756-22.756-17.067-56.889 5.689-79.645L642.844 568.89c11.378-11.378 17.067-22.756 17.067-34.133 0-11.378-5.689-22.756-17.067-34.134L273.067 187.733c-22.756-22.755-28.445-56.889-5.69-79.644 22.756-22.756 56.89-28.445 79.645-5.689l364.09 312.889C745.243 443.733 768 489.244 768 534.756s-17.067 85.333-51.2 119.466L352.711 984.178c-11.378 5.689-28.444 11.378-39.822 11.378z"
        ></path>
      </svg>
    </div>
    <div :class="['right-arrow',{'is-active':activeIndex < total}]" @click="rightClick">
      <svg
          v-if="activeIndex < total" height="1024" version="1.1" viewBox="0 0 1024 1024" width="1024"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M730.026734 0c18.713977 0 37.429954 7.144991 51.714937 21.429974 28.570965 28.572965 28.570965 74.857909 0 103.426874L394.527143 511.999375l387.214528 387.142527c28.570965 28.536965 28.570965 74.857909 0 103.428874s-74.857909 28.570965-103.428874 0L239.314333 563.713312C225.59935 549.999329 217.886359 531.427351 217.886359 511.999375s7.712991-37.999954 21.427974-51.713937L678.311797 21.427974C692.59778 7.143991 711.312757 0 730.026734 0z"
        ></path>
      </svg>
      <svg v-else height="1024" version="1.1" viewBox="0 0 1024 1024" width="1024" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M312.889 995.556c-17.067 0-28.445-5.69-39.822-17.067-22.756-22.756-17.067-56.889 5.689-79.645L642.844 568.89c11.378-11.378 17.067-22.756 17.067-34.133 0-11.378-5.689-22.756-17.067-34.134L273.067 187.733c-22.756-22.755-28.445-56.889-5.69-79.644 22.756-22.756 56.89-28.445 79.645-5.689l364.09 312.889C745.243 443.733 768 489.244 768 534.756s-17.067 85.333-51.2 119.466L352.711 984.178c-11.378 5.689-28.444 11.378-39.822 11.378z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$sve_size: 18px;
.arrows-button {
  display: flex;
  width: 100px;
  justify-content: space-between;

  .left-arrow {
    outline: none;
    border-color: v-bind(buttonColor);
    @apply w-10 h-10 rounded-3xl flex items-center justify-center border-solid border rotate-180 box-border;
    &.is-active {
      border-width: 2px;
      @apply rotate-0
    }

    svg {
      outline: none;
      width: $sve_size;
      height: $sve_size;
      fill: v-bind(buttonColor);
    }
  }

  .right-arrow {
    border-color: v-bind(buttonColor);
    outline: none;
    @apply w-10 h-10 rounded-3xl flex items-center justify-center border-solid border rotate-0 box-border;
    svg {
      outline: none;
      width: $sve_size;
      height: $sve_size;
      fill: v-bind(buttonColor);
    }

    &.is-active {
      border-width: 2px;
      @apply rotate-180;
    }
  }
}
</style>
