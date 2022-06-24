<template>
    <div class="app-wrapper">
        <div class="main-page">
            <div class="header">
                <div class="user">
                    <el-dropdown>
                        <div class="userInfo">
                            <div class="image">
                                <img :src="avater ? avater : HeaderImage" alt=""/>
                            </div>
                            <span class="username">{{ info && info.name }}</span>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="toLogout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <div class="main-page">
                <el-card>
                    <span class="no-auth">抱歉，您没有权限这么做！</span>
                    <div class="no-auth-sub">请您联系管理员添加相应权限，并退出重新登录！</div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderImage from '@/assets/header-new.png'
import { mapState,mapActions } from 'pinia'
import { userStore } from '@/stores/user'
export default {
    data(){
        return {
            HeaderImage
        }
    },
    computed: {
        ...mapState(userStore, ['avater','info'])
    },
    methods: {
        ...mapActions(userStore, ['logout']),
        toLogout(){
            this.logout()
            this.$router.replace('/automaticLogin')
        }
    }
}
</script>

<style lang="less" scoped>
.app-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    .app-slider{
        width: 250px !important;
        height: 100%;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
        background: rgb(53, 53, 100);
        display: flex;
        flex-direction: column;
        color: #fff;
        .logo-wrapper{
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            .logo{
                height: 35px;
                img{
                    height: 100%;
                }
            }
        }
        .slide-menu{
            flex: 1;
            width: 100%;
            background: lighten(rgb(53, 53, 100),10%);
            :deep(.el-menu){
                border-right: solid 1px transparent;
            }
            .fb{
                font-weight: bold;
                font-size: 16px;
            }
        }
        .setting-button{
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: all .5s;
            .icon{
                font-size: 20px;
                padding: 15px 20px;
            }
            .name{
                font-weight: bold;
                font-size: 16px;
            }
            &:hover{
                background: lighten(rgb(53, 53, 100),10%);
            }
        }
    }
    .main-page{
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        flex: 1;
        .header{
            width: 100%;
            height: 50px;
            padding: 10px 20px;
            box-sizing: border-box;
            box-shadow: 0 0 5px 5px rgba(#333,.1);
            background:#5e9ce3;

            position: relative;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            user-select: none;
            .logo{
                height: 35px;
                img{
                    height: 100%;
                }
            }
            .user{
                .userInfo{
                    display: flex;
                    align-items: center;
                    .image{
                        width: 35px;
                        height: 35px;
                        margin-right: 20px;
                        overflow: hidden;
                        border-radius: 50%;
                        border: 2px solid #fff;
                        img{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                }
                .username{
                    font-weight: bold;
                    cursor: pointer;
                    color:#fff
                }
            }
        }
        .main-page{
            width: 100%;
            flex: 1;
            overflow: hidden;
            padding: 20px;
            box-sizing: border-box;
            text-align: center;
            .no-auth{
                font-size: 18px;
                font-weight: bold;
                color: #333;
            }
            .no-auth-sub{
                font-size: 16px;
                color: #666;
                margin-top: 20px;
            }
        }
    }
}
</style>