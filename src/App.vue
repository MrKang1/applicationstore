<template>
    <el-config-provider :locale="zhCn">
        <router-view />
    </el-config-provider>
    <layout-tool />
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import LayoutTool from '@/components/system-fixed/index.vue'
</script>
