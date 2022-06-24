/// <reference types="vite/client" />
import { Theme } from './utils/theme'
// GlobalComponents for Volar
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $theme: Theme
    }
}

export { }
