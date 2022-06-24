<template>
    <div class="mode-container">
        <div class="top-h"></div>
        <div class="middle-h">
            <div class="left-h"></div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@main: #323549;
@bg: #f9f9f9;
.mode-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 5px 1px rgba(0,0,0,.1);
    .top-h{
        width: 100%;
        height: 35%;
        overflow: hidden;
        background: @main;
    }
    .middle-h{
        flex: 1;
        width: 100%;
        overflow: hidden;
        background: @bg;
        display: flex;
        justify-content: center;
        .left-h{
            width: 65%;
            height: 100%;
            background: #fff;
            box-shadow: 0 0 5px 1px rgba(0,0,0,.1);
        }
    }
}
</style>
