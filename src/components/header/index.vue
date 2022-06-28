<template>
    <div class="header-wrapper">
        <div class="left">
            <div class="logo">
                <img :src="$theme.getThemeLogo()" alt="logo"/>
                <span class="logo-text" :style="{fontSize: $theme.text_size, color: $theme.getTextColor()}">{{ title }}</span>
            </div>
            <div class="aslider-status" :style="{color: $theme.getTextColor()}" @click="toCollsep" v-if="layout != 'ADMIN_MAIN'">
                <el-tooltip
                    effect="dark"
                    :content="barStatus == AsliderBarStatus.OPEN ? '收起侧边栏' : '展开侧边栏'"
                    placement="bottom"
                >
                    <i-ep-fold v-if="barStatus == AsliderBarStatus.OPEN"/>
                    <i-ep-expand v-else/>
                </el-tooltip>
            </div>
            <div v-if="layout == 'ADMIN_MAIN'" class="menu" :style="{color: $theme.getTextColor()}" @click="toOpenMenu">
                <el-tooltip
                    effect="dark"
                    content="菜单"
                    placement="bottom"
                >
                    <i-ep-menu/>
                </el-tooltip>
            </div>
        </div>
        <el-dropdown>
            <div class="right">
                <div class="gloab-loading" v-if="loading">
                    <i-ep-refresh-right/>
                </div>
                <div class="user-name">用户名</div>
                <div class="photo">
                    <img src="/img/header.png" alt="用户头像"/>
                </div>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>更新权限</el-dropdown-item>
                    <el-dropdown-item divided @click="toLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
    <el-drawer
        v-model="menuShow"
        append-to-body
        :size="250"
        title="菜单"
        :with-header="false"
        custom-class="drawer-menu"
        direction="ltr">
        <aslider-bar/>
    </el-drawer>
</template>

<script lang="ts" setup>
import { SystemStore } from '@/stores/system'
import { AsliderBarStatus } from '@/types/system'
import { Theme } from '@/utils/theme'
import { computed, getCurrentInstance, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import AsliderBar from '@/components/aslider/index.vue'

const sys = SystemStore()
const instance = getCurrentInstance()
const $theme:Theme = instance?.appContext.config.globalProperties.$theme
const title: string = import.meta.env.VITE_PRODUCT_NAME
const menuShow = ref<boolean>(false)

const layout = computed(() => {
    return SystemStore().getLayout
})

const barStatus = computed({
    get () {
        return sys.sliderStatus
    },
    set (status: AsliderBarStatus) {
        $theme.setSliderStatus(status)
    }
})

const loading = computed(() => {
    return sys.loading
})

const toCollsep = () => {
    const cur = barStatus
    if (cur.value === AsliderBarStatus.OPEN) {
        barStatus.value = AsliderBarStatus.CLOSE
    } else {
        barStatus.value = AsliderBarStatus.OPEN
    }
}

const toLogout = () => {
    ElMessageBox.confirm('您确定要退出当前登录吗？', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(() => {
        ElMessage.success('成功退出')
    }).catch(() => {
        ElMessage.info('您已经取消当前操作')
    })
}

const toOpenMenu = () => {
    console.log('执行了')
    menuShow.value = true
}
</script>

<style lang="less" scoped>
@logo-width: 45px;
@keyframes circle {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
@media only screen and (max-width: 768px) {
    .logo-text{
        display: none;
    }
    .logo{
        width: auto !important;
    }
}
.header-wrapper {
    background-image: linear-gradient(to right , var(--el-color-primary) 300px, var(--el-slider-bg-color));
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    .left {
        flex: 1;
        display: flex;
        align-items: center;
        .menu{
            font-size: 22px;
            cursor: pointer;
            transition: var(--el-transition-duration);
            &:hover{
                transform: scale(1.1);
            }
        }
    }
    .right {
        display: flex;
        align-items: center;
    }
    .logo {
        height: @logo-width;
        display: flex;
        align-items: center;
        font-family: font02;
        width: var(--el-aside-width);
        box-sizing: border-box;
        padding: 0 20px;
        img{
            height: 100%;
            width: @logo-width;
            object-fit: cover;
            margin-right: 8px;
        }
    }
    .aslider-status{
        font-size: 22px;
        cursor: pointer;
        transition: var(--el-transition-duration);
        &:hover{
            transform: scale(1.1);
        }
    }
    .photo{
        width: @logo-width;
        height: @logo-width;
        overflow: hidden;
        border-radius: 50%;
        border: 5px solid #fff;
        box-sizing: border-box;
        box-shadow: var(--el-box-shadow-light);
        margin: 0 20px;
        cursor: pointer;
        transition: .2s;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &:hover{
            transform: translate(0, -10px);
        }
    }
    .gloab-loading{
        margin: 0 20px;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        animation: circle 1s infinite ease-in-out;
    }
}
:deep(.el-drawer__body){
    padding: 0 !important;
}
</style>
