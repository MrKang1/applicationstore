<template>
    <el-scrollbar class="aslider-contaienr">
        <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            :collapse="barStatus === AsliderBarStatus.CLOSE && layout != 'ADMIN_MAIN'"
        >
            <el-sub-menu index="1">
                <template #title>
                    <i-ep-menu/>
                    <span>Navigator One</span>
                </template>
                <el-menu-item-group>
                    <template #title><span>Group One</span></template>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title><span>item four</span></template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
                <i-ep-menu/>
                <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="1">
                <i-ep-menu/>
                <template #title>Navigator Two</template>
            </el-menu-item>
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { SystemStore } from '@/stores/system'
import { AsliderBarStatus } from '@/types/system'

const layout = computed(() => {
    return SystemStore().getLayout
})

const barStatus = computed(() => {
    return SystemStore().sliderStatus
})
</script>

<style lang="less" scoped>
@keyframes jumps {
    0% {transform: translate(0, 0);}
    45% {transform: translate(0, 5px);}
    90% {transform: translate(0, -5px);}
    100% {transform: translate(0, 0);}
}
.aslider-contaienr{
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom , var(--el-color-primary) 300px, var(--el-slider-bg-color));
    :deep(.el-menu){
        border-right: none;
        .el-menu-item{
            transition: all var(--el-transition-duration);
            &.is-active{
                background: #fff;
            }
            &:hover{
                transform: translate(10px ,0);
                box-shadow: var(--el-box-shadow-light);
            }
        }
        .el-sub-menu{
            &.is-active {
                .el-sub-menu__title{
                    color: var(--el-color-primary-light-3);
                    animation: jumps 1s infinite;
                }
                &.is-opened{
                    .el-sub-menu__title{
                        color: var(--el-color-primary-light-3);
                        animation: none !important;
                    }
                }
            }
        }
    }
}
</style>
