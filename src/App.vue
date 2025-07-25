<script setup>
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div v-if="false" class="text-cyan-400">注入tailwindcss,这个不能删除</div>
    <div id="app">
      <router-view />
    </div>
  </el-config-provider>
</template>

<style lang="scss" scoped></style>
