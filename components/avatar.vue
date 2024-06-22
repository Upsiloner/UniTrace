<template>
    <div class="user-box" @click="gotohome">
        <div class="avatar" @mouseenter="showOptions" @mouseleave="hideOptions">
            <UIcon :name="status_name" class="status" :style="{ color: statusColor }"/>
            <NuxtImg class="avatar-img" src="/default_avatar.png"/>
            <div class="choose-box" v-show="showOptionsBox">
                <div class="choose-content">
                    <router-link to="#" class="link">
                        切换账户
                        <div class="more-icon"><UIcon name="i-heroicons-user-plus" /></div>
                    </router-link>
                    <router-link to="/" class="link">
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
import { ref, onMounted } from 'vue';
import { UserGetinfo } from '~/services/api/auth'
const username = ref("加载中...");
// i-heroicons-face-smile-16-solid, i-heroicons-minus-circle-16-solid, i-heroicons-x-circle-16-solid
const status_name = ref("i-heroicons-face-smile-16-solid");
const statusColor = computed(() => {
    if (status_name.value === 'i-heroicons-face-smile-16-solid') {
        return '#5CDC59';
    } else if (status_name.value === 'i-heroicons-minus-circle-16-solid') {
        return '#F6B91F';
    } else if (status_name.value === 'i-heroicons-x-circle-16-solid') {
        return 'red';
    }
});

const showOptionsBox = ref(false);
const showOptions = () => {
    showOptionsBox.value = true;
}
const hideOptions = () => {
    showOptionsBox.value = false;
}

// get user information
async function GetUserInfo() {
    try {
        const data = await UserGetinfo();
        if (data.code === 200) {
            username.value = data.user.name;
        } else {
            console.error(data.msg);
        }
    } catch (error) {
        console.error('查询失败:', error);
    }
}

const gotohome = (event) => {
    if(!event.target.classList.contains('link')) {
        // TODO: go to home page
        console.log("test");
    }
}
// onMounted
onMounted(() => {
    GetUserInfo();
});
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
.avatar-img {
    width: 40px;
    border-radius: 50%;
    border: #ECECEC solid 2px;
    min-width: 46px;
}

.avatar-img:hover .options-box {
    display: block;
}

.avatar {
    position: relative;
} 

.status {
    position: absolute;
    font-size: 16px;
    top: -3px;
    right: -3px;
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
        margin-left: -34px;
        width: 60px;
    }
    .user-box:hover {
        background-color: white;
    }
    .choose-content {
        margin-left: -40px;
    }
}
</style>