import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/reset.css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css' // message-box 这个组件的css没有呗导入进来，手动导入一下
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import filter from '@/utils/filters'
import theme from '@/utils/theme'
import layout from '@/utils/layout'
import router from '@/router/index'

const store = createPinia()
store.use(createPersistedState({
    storage: window.sessionStorage,
    key: 'PRODUCT_APP'
}))

const app = createApp(App)
app.use(store)
app.use(filter)
app.use(theme)
app.use(layout)
app.use(router)
app.mount('#app')
