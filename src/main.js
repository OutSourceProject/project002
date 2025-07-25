import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'
import '@/assets/styles/index.scss'
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from '@/App.vue'
import router from '@/router'

axios.defaults.withCredentials = true
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#root')
