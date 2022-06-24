<template>
    <div class="layout-fixed-tool" v-if="$theme.status" @click="toShow">
        <i-ep-setting/>
    </div>
    <el-drawer
        v-model="show"
        :size="300"
        title="个性化设置"
        direction="rtl">
        <el-row :gutter="10">
            <el-col :span="24" class="setting-title">主题色</el-col>
            <el-col
                :span="12"
                v-for="(item,i) in list"
                :key="i"
                class="color-card"
                :class="{active: item.key == current}"
                @click="toThemeSetting(item.key)">
                <div class="color-wrapper">
                    <div class="color-box" :style="{background: item.show}"></div>
                </div>
                {{ item.name }}
            </el-col>
            <el-col :span="24" class="setting-title">整体布局</el-col>
            <el-col
                :span="12"
                v-for="(item,i) in layoutList"
                :key="i"
                class="color-card"
                :class="{active: item.key == currentLayout}"
                @click="toLayoutSetting(item.key)">
                <div class="color-wrapper">
                    <div class="color-box">
                        <component :is="item.component"/>
                    </div>
                </div>
                {{ item.name }}
            </el-col>
        </el-row>
    </el-drawer>
</template>

<script lang="ts" setup>
import { Layout } from '@/utils/layout'
import { Theme } from '@/utils/theme'
import { SystemStore } from '@/stores/system'
import { computed, getCurrentInstance, ref } from 'vue'

const instance = getCurrentInstance()
const $theme:Theme = instance?.appContext.config.globalProperties.$theme
const $layout:Layout = instance?.appContext.config.globalProperties.$layout
const show = ref(false)
const list = $theme.getThemeList()
const current = ref($theme.getTheme())

const layoutList = $layout.getLayoutList()
const currentLayout = computed({
    get ():string {
        return SystemStore().getLayout
    },
    set (val: string) {
        $layout.setLayout(val)
    }
})

const toShow = () => {
    show.value = true
}
const toThemeSetting = (key: string) => {
    $theme.setTheme(key)
    current.value = $theme.getTheme()
}
const toLayoutSetting = (key: string) => {
    $layout.setLayout(key)
    currentLayout.value = $layout.getLayout()
}
</script>

<style lang="less" scoped>
@keyframes active-animation {
    0% {transform: scale(.8);}
    100% {transform: scale(1.3);}
}
.setting-title{
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--el-border-color);
}
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
.color-card{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    &.active{
        font-weight: bold;
        .color-box{
            width: 50px;
            height: 50px;
            animation-name: active-animation;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            animation-direction: alternate-reverse;
            cursor: default;
            border: 5px solid #fff;
            box-shadow: var(--el-box-shadow-light);
        }
    }
    .color-wrapper{
        width: 60px;
        height: 60px;
        margin-bottom: 10px;
    }
    .color-box{
        width: 60px;
        height: 60px;
        border-radius: 5px;
        cursor: pointer;
        overflow: hidden;
        transition: .5s;
        &:hover{
            transform: rotateZ(20deg);
        }
    }
}
</style>
