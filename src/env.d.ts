/// <reference types="vite/client" />
import type { Theme } from '@/utils/theme'
import '@vue/runtime-core'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'components/*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMeta {
  // eslint-disable-next-line no-use-before-define
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_PRODUCT_NAME: string
}

declare module '@vue/runtime-core' {
  interface ComponentPublicInstance {
    $theme: Theme
  }
}

export {}
