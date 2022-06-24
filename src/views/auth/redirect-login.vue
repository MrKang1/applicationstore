<template>
    <div v-loading.fullscreen.lock="true" element-loading-text="拼命登录中..."></div>
</template>

<script setup lang="ts">
import {
    RequestLoginedInfo,
    SSOToken,
    getTalkUserInfo,
    endsession
} from "@/apis/index"
// import Watermark from '@/assets/watermark'
import { userStore } from '@/stores/user'
import { useRoute,useRouter } from "vue-router"

const $route = useRoute()
const $router = useRouter()
const userStores = userStore()
let token = userStores.token
let redirect_uri = ""
redirect_uri = window.location.origin + "/redirectlogin"

if (token || $route.query['code']) {
    let query = {
        grant_type: "authorization_code",
        client_id: "Yc.SelfHelpService",
        client_secret: "secret",
        redirect_uri: redirect_uri,
        code: $route.query['code'],
        scope: "StaffInfo"
    }
    SSOToken(query).then(res => {
        if (res.access_token) {
            const tokens = res.access_token
            if (!token || token != tokens){
                token = tokens
                userStores.$patch({ // 放入pinia仓库中
                    token
                })
            }
            // 获取用户信息
            RequestLoginedInfo().then(TokenResult => {
                // 获取头像信息
                if (TokenResult.success && TokenResult.result && TokenResult.result.staffInfo) {
                    const info: {[x: string]: string} = TokenResult.result.staffInfo
                    userStores.$patch({ // 放入pinia仓库中
                        name: info.name
                    })
                    getTalkUserInfo({
                        userId: info.guid
                    }).then(userInfo=>{
                        let avater = userInfo?.result?.portraitUri??null
                        avater = avater == 'Default' ? null : avater // 防止后台默认值影像当前参数
                        userStores.$patch({ // 放入pinia仓库中
                            avater
                        })
                    })
                    $router.push('/')
                }
            })
        }
    }).catch(()=>{
        alert('网络请求失败')
    })
} else {
    alert("code不存在或失效请重新登录")
    window.location.href = endsession
}

</script>
