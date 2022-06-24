/// <reference types="vite/client" />
import { Layout } from './utils/layout'
// GlobalComponents for Volar
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $layout: Layout
    }
}

export { }
