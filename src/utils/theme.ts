import { App } from 'vue'
import Color from '@/utils/color'
import { AsliderBarStatus, ColorElementType } from '@/types/system'
import { SystemStore } from '@/stores/system'
export class Theme {
    private storage_key = 'THEME_CONTENT' // 主题色
    private storage_slider_bar = 'THEME_SLIDER_STATUS' // slider的收缩情况
    private color : ColorElementType[] = Color
    public text_size = '26px' // LOGO文字大小
    public status = true // 是否启用主题功能
    private root_style = window.document.documentElement.style
    constructor (private app: App) {
        if (this.status) {
            this.setTheme(this.getTheme())
        }
        this.setSliderStatus(this.getSiderStatus())
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

    getThemeList () : {name: string, key: string, show: string}[] {
        return this.color.map(item => ({
            name: item.name,
            key: item.key,
            show: item.show
        }))
    }

    getSiderStatus () : AsliderBarStatus {
        const status:string | null = localStorage.getItem(this.storage_slider_bar)
        if (!status) {
            return AsliderBarStatus.OPEN
        }
        return AsliderBarStatus.OPEN === status ? AsliderBarStatus.OPEN : AsliderBarStatus.CLOSE
    }

    setSliderStatus (status: string) {
        if (AsliderBarStatus.OPEN !== status && AsliderBarStatus.CLOSE !== status) {
            status = AsliderBarStatus.OPEN
        }
        const sysHandle = SystemStore()
        sysHandle.sliderStatus = status === AsliderBarStatus.OPEN ? AsliderBarStatus.OPEN : AsliderBarStatus.CLOSE
        localStorage.setItem(this.storage_slider_bar, status)
    }

    // 建议使用网络地址，用来保证http1的请求个数
    getThemeLogo (): string {
        const themeItem = this.color.find(color => color.key === this.getTheme())
        if (!themeItem) {
            return '/img/logo.png'
        }
        return themeItem.icon
    }

    getTextColor ():string {
        const themeItem = this.color.find(color => color.key === this.getTheme())
        if (!themeItem) {
            return '#fff'
        }
        return themeItem.textColor
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
            this.root_style.setProperty(ele, color.colors[ele])
        }
    }
}

export default {
    install (app:App<Element>) {
        const layout = new Theme(app)
        app.config.globalProperties.$theme = layout
    }
}
