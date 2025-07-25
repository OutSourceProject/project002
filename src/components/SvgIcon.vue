<template>
  <svg aria-hidden="true">
    <use :fill="color" :href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#333',
  },
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
