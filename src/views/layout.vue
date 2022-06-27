<template>
    <el-container class="main-container">
        <el-header class="header">
            <header-bar />
        </el-header>
        <el-container class="layout-container" :class="{insetType: layout == 'ADMIN_MAIN'}">
            <el-aside class="aslider-wrapper" v-if="layout != 'ADMIN_MAIN'" :style="barStatus === AsliderBarStatus.CLOSE ? {width: '65px'} : {}">
                <aslider-bar/>
            </el-aside>
            <el-main class="sub-layer" :class="{'main-width': layout == 'ADMIN_MAIN'}">Main</el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance } from 'vue'
import { SystemStore } from '@/stores/system'
import { Layout } from '@/utils/layout'
import { AsliderBarStatus } from '@/types/system'
import HeaderBar from '@/components/header/index.vue'
import AsliderBar from '@/components/aslider/index.vue'

const instance = getCurrentInstance()
const $layout:Layout = instance?.appContext.config.globalProperties.$layout

const layout = computed({
    get ():string {
        return SystemStore().getLayout
    },
    set (val: string) {
        $layout.setLayout(val)
    }
})

const barStatus = computed(() => {
    return SystemStore().sliderStatus
})
</script>

<style lang="less" scoped>
.main-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .header{
        position: relative;
        height: 65px;
        padding: 0;
    }
    .aslider-wrapper{
        transition: .2s;
    }
    .layout-container{
        flex: 1;
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        &.insetType{
            box-shadow: inset var(--el-box-shadow);
        }
    }
    .sub-layer{
        flex: 1;
        height: 100%;
        overflow: hidden;
        box-shadow: inset var(--el-box-shadow-light);
    }
    .main-width{
        max-width: 1200px;
        box-shadow: none;
    }
}
</style>
