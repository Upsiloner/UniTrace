<template>
    <div class="user-box">
        <div class="avatar" @mouseenter="showOptions" @mouseleave="hideOptions">
            <NuxtImg id="avatar" src="/default_avatar.png"/>
            <div class="choose-box" v-show="showOptionsBox">
                <div class="choose-content">
                    <router-link to="#">
                        切换账户
                        <div class="more-icon"><UIcon name="i-heroicons-user-plus" /></div>
                    </router-link>
                    <router-link to="/">
                        退出登录
                        <div class="more-icon"><UIcon name="i-heroicons-arrow-right-start-on-rectangle-20-solid" /></div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="username">
            {{ username }}
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const username = ref("哼哼果");

const showOptionsBox = ref(false);
const showOptions = () => {
  showOptionsBox.value = true;
}
const hideOptions = () => {
  showOptionsBox.value = false;
}
</script>

<style>
.user-box {
    display: flex;
    align-items: center;
    height: 58px;
    width: 190px;
    align-items: center;
    padding: 10px 20px 10px 20px;
    border-radius: 16px;
    position: relative;
}
.user-box:hover {
    background-color: #ECECEC;
}
#avatar {
    width: 40px;
    border-radius: 50%;
    border: #ECECEC solid 2px;
    min-width: 46px;
}

#avatar:hover .options-box {
    display: block;
}
.username {
    font-size: large;
    margin-left: 10px;
}
.choose-box {
    position: absolute;
    bottom: 80%;
    width: 160px;
    left: 0;
}

.choose-box a{
    display: flex;
    font-size: larger;
    color: black;
    padding: 6px 16px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
}
.choose-content {
    border-radius: 16px;
    margin-bottom: 20px;
    width: 160px;
    box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.2);
    background-color: white;
}
.choose-content a:hover{
    background-color: #F7F7F7;
}
.more-icon {
    margin-top: 6px;
    margin-left: 8px;
    font-size: larger;
}
@media (max-width: 800px) {
    .username {
        display: none;
    }
    .user-box {
        padding-left: 4px;
        width: 60px;
    }
    .user-box:hover {
        background-color: white;
    }
}
</style>