<template>
    <div class="layout-fixed-tool">
        <i-ep-setting/>
    </div>
</template>

<script lang="ts" setup>
import { Layout } from '@/utils/layout'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
if (instance && instance.proxy) {
    const $layout:Layout = (instance.proxy['$layout'] as Layout)
    console.log(instance.appContext.config.globalProperties.$layout, $layout.status)
}
</script>

<style lang="less" scoped>
.layout-fixed-tool{
    width: 50px;
    height: 50px;
    background: var(--el-color-primary);
    position:fixed;
    right: 0;
    bottom: 50%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    box-shadow: var(--el-box-shadow-light);
    color: var(--el-color-white);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: pointer;
    transition: all .1s;
    line-height: 1;
    &:hover{
        background: var(--el-color-primary-light-3);
        font-size: 25px;
    }
}
</style>
