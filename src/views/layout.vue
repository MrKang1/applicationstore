<template>
    <el-container class="main-container">
        <el-header>Header</el-header>
        <el-container class="layout-container">
            <el-aside v-if="layout != 'ADMIN_MAIN'" width="250px">Aside</el-aside>
            <el-main class="sub-layer" :class="{'main-width': layout == 'ADMIN_MAIN'}">Main</el-main>
        </el-container>
    </el-container>
    <div v-if="layout == 'ADMIN_LEFT_TOP'"></div>
    <div v-else-if="layout == 'ADMIN_MAIN'"></div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance } from 'vue'
import { SystemStore } from '@/stores/system'
import { Layout } from '@/utils/layout'

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
</script>

<style lang="less" scoped>
.main-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .layout-container{
        flex: 1;
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
    }
    .sub-layer{
        flex: 1;
        height: 100%;
        overflow: hidden;
    }
    .main-width{
        max-width: 1200px;
    }
}
</style>
