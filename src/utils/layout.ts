import { App } from 'vue'
import layoutConfig from './layout.config'
import { SystemStore } from '@/stores/system'
// 这个类比较关键 不能有篡改，所以暴露的方法全部添加防篡改
export class Layout {
    private storage_key = 'SYSLAYOUT'
    private config = layoutConfig
    private $store = SystemStore()
    constructor () {
        this.setLayout(this.getLayout())
    }

    getLayout (): string {
        const type = localStorage.getItem(this.storage_key)
        const exist = this.config.find(item => item.key === type)
        if (!type || !exist) { // 如果你是乱输得
            return this.config[0].key
        }
        if (this.$store.getLayout !== type) {
            this.$store.$patch({
                layout: type
            })
        }
        return type
    }

    setLayout (name: string) {
        name = name ? name.trim() : ''
        const exist = this.config.find(item => item.key === name)
        if (!exist) { // 如果你是乱输得
            name = this.config[0].key
        }
        localStorage.setItem(this.storage_key, name)
        if (this.$store.getLayout !== name) {
            this.$store.$patch({
                layout: name
            })
        }
    }

    getLayoutList () {
        return this.config
    }
}

export default {
    install (app:App<Element>) {
        const $layout = new Layout()
        app.config.globalProperties.$layout = $layout
    }
}
