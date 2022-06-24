import { App } from 'vue'
import Color from '@/utils/color'
import { ColorElementType } from '@/types/system'

export class Layout {
    private storage_key = 'THEME_CONTENT'
    private color : ColorElementType[] = Color
    public status = true
    private rootStyle = window.document.documentElement.style
    constructor (private app: App) {
        if (this.status) {
            this.setTheme(this.getTheme())
        }
    }

    getTheme () : string { // 返回当前是什么主题
        let key: string | null = localStorage.getItem(this.storage_key)
        if (!key || !this.color.find(color => color.key === key)) {
            key = this.color[0].key
        }
        return key
    }

    setTheme (themeName: string) {
        // 检测传入的值是否存在
        if (!this.color.find(color => color.key === themeName)) {
            return
        }
        if (localStorage.getItem(this.storage_key) !== themeName) {
            localStorage.setItem(this.storage_key, themeName)
        }
        this.applyTheme()
    }

    // 应用主题
    private applyTheme () {
        if (!this.status) {
            return
        }
        const key: string = this.getTheme()
        const color = this.color.find(color => color.key === key)
        if (!color) {
            return
        }
        for (const ele in color.colors) {
            this.rootStyle.setProperty(ele, color.colors[ele])
        }
    }
}

export default {
    install (app:App<Element>) {
        const layout = new Layout(app)
        app.config.globalProperties.$layout = layout
    }
}
