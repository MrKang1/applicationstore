import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        eslintPlugin({
            include: [
                'src/**/*.js',
                'src/**/*.vue',
                'src/*.js',
                'src/*.vue'
            ]
        }),
        AutoImport({
            imports: ['vue'],
            resolvers: [
                ElementPlusResolver(),
                IconResolver({
                    prefix: 'Icon'
                })
            ]
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
                IconResolver({
                    enabledCollections: ['ep']
                })
            ]
        }),
        Icons({
            autoInstall: true
        })
    ],
    build: {
        brotliSize: false
    },
    resolve: {
        alias: {
            '@': path.resolve('./src')
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import "${path.resolve('./src/assets/css/common.less')}";`
                },
                javascriptEnabled: true,
                charset: false,
                additionalData: 'html{background: #f00;}'
            }
        }
    },
    server: {
        port: 2005,
        proxy: {
            '/portal': {
                target: 'http://10.0.7.50:5005',
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(/^\/portal/, '')
            }
        }
    }
})
