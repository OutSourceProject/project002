import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRetrospectRememberStore = defineStore('retrospectRemember', () => {
  const pageScrollTop = ref(false)
  const setPageScrollTop = (val)=>{
    pageScrollTop.value = val
  }

  return { pageScrollTop, setPageScrollTop }
})
