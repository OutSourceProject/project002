import { fileURLToPath, resolve, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  const plugins = [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
    ElementPlus({
      useSource: true,
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(fileURLToPath(new URL('./src/assets/icons', import.meta.url)), '')],
      // 指定symbolId格式
      symbolId: 'icon-[name]',

      /**
       * 自定义插入位置
       * 'body-last' | 'body-first',
       * @default: body-last
       */
      inject: 'body-last',

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
    }),
  ]
  // 非生产环境配置调试工具
  if (!isProduction) {
    plugins.push(vueDevTools())
  }
  return {
    plugins: plugins,
    server: {
      //host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'https://admin.yufengyurong.com/',
          changeOrigin: true,
        },
      },
    },
    esbuild: {
      legalComments: 'none',
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "~/assets/styles/element-plus/index.scss" as *;@use "~/assets/styles/tailwind.scss" as *;`,
        },
      },
    },
    build: {
      sourcemap: !isProduction,
      target: 'es2015',
      reportCompressedSize: false,
      minify: 'esbuild',
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      emptyOutDir: true,
      cssTarget: 'chrome80',
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.')
            let extType = info[info.length - 1]
            if (/\.(png|jpe?g|gif|svg|webp|ico)(\?.*)?$/.test(assetInfo.name)) {
              extType = 'img'
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'fonts'
            } else if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/.test(assetInfo.name)) {
              extType = 'media'
            }
            return `assets/${extType}/[name]-[hash].[ext]`
          },
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            // echarts: ['echarts', 'echarts-gl', 'zrender'],
            ui: ['element-plus'],
            // 'sql-formatter': ['sql-formatter'],
            // 'grid-layout': ['vue-grid-layout-v3'],
            // lodash: ['lodash-es'],
            // vueuse: ['@vueuse/core'],
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
        format: {
          comments: false,
        },
      },
    },
  }
})
