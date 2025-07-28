<script setup>
import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="app-box">
      <div v-if="false" class="text-cyan-400">注入tailwindcss,这个不能删除</div>
      <div id="app">
        <router-view/>
      </div>
      <div class="footer-box">
        <a href="#">粤ICP备2025448352号</a>
      </div>
    </div>
  </el-config-provider>
</template>

<style lang="scss" scoped>
$footer-height: 40px;
.app-box {
  width: 100vw;
  height: 100vh;

  #app {
    width: 100%;
    height: 100%;
  }

  .footer-box {
    width: 100%;
    height: $footer-height;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    font-size: 12px;

    a {
      color: rgba(102, 102, 102, 0.93);

      &:hover {
        color: #666666;
      }
    }
  }
}
</style>
