<!-- layouts/default.vue -->
<template>
    <div class="top-bar">
        <div class="left">
            <NuxtImg id="logo" src="/logo.png" />
            <div id="brand"><NuxtLink to="/main/square">宇迹</NuxtLink></div>
        </div>
        <div class="middle">
            <div class="search-box">
                <input type="text" placeholder="搜索内容..." class="search-input" v-model="searchText">
                <UIcon class="clear-icon" name="i-heroicons-x-mark"  v-if="searchText" @click="clearSearch"/>
                <UIcon class="search-icon" name="i-heroicons-magnifying-glass-20-solid"/>
            </div>
        </div>
        <div class="right">
            <div id="more" @mouseenter="showOptions" @mouseleave="hideOptions">
                <UIcon name="i-heroicons-bars-3-16-solid"/>
                <div id="more-text">更多</div>
                <div v-show="showOptionsBox" class="options-box">
                    <div class="options-content">
                        <router-link to="#">
                            关于宇迹
                            <div class="more-icon"><UIcon name="i-heroicons-book-open" /></div>
                        </router-link>
                        <router-link to="#">
                            隐私政策
                            <div class="more-icon"><UIcon name="i-heroicons-eye-slash" /></div>
                        </router-link>
                        <router-link to="#">
                            社区规范
                            <div class="more-icon"><UIcon name="i-heroicons-building-library" /></div>
                        </router-link>
                    </div>
                </div>
            </div>
            <UIcon :name="mode === 'day' ? 'i-heroicons-sun-16-solid' : 'i-heroicons-moon'" 
                   @click="toggleMode"
                   id="mode" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const mode = ref('day');
const toggleMode = () => {
    mode.value = mode.value === 'day' ? 'night' : 'day';
    // 这里可以添加切换模式时的其他逻辑，比如切换页面主题色等
};
const searchText = ref('');
const clearSearch = () => {
  searchText.value = '';
}

const showOptionsBox = ref(false);
const showOptions = () => {
  showOptionsBox.value = true;
}
const hideOptions = () => {
  showOptionsBox.value = false;
}
</script>

<style scoped>
.top-bar {
    width: 100%;
    display: flex;
    align-items: center;
    height: 70px;
    margin-top: 8px;
    margin-bottom: 10px;
    position: fixed;
}
.left {
    width: 240px;
    display: flex;
    margin-left: 10px;
    color: rgb(131, 56, 161);
}
#logo {
    height: 72px;
    margin-top: 16px;
    margin-left: 36px;
    min-width: 58px;
}
#brand {
    font-size: 36px;
    color: black;
    font-family: "deyihei";
    margin: 28px 14px;
    text-shadow: 4px 6px 8px rgba(164, 86, 206, 0.4);
}
.search-box {
    width: 46%;
    height: 70%;
    margin: 0;
    display: flex;
    align-items: center;
    background-color: #ECECEC;
    border-radius: 24px;
    min-width: 300px;
}
.search-box:hover {
    border: #8338a1 solid 1px;
}
.search-input {
    width: 100%;
    padding-left: 24px;
    padding-right: 20px;
    font-size: large;
    border: none;
    background-color: transparent;
    outline: none;
}

.search-icon {
    margin-left: auto;
    font-size: 28px;
    color: gray;
    margin-right: 15px;
    width: 28px;
    height: 28px;
}

.search-icon:hover {
    color: #8338a1;
}

.clear-icon {
    margin-left: auto;
    font-size: 28px;
    color: gray;
    margin-right: 15px;
    width: 28px;
    height: 28px;
}

.clear-icon:hover {
    color: rgb(131, 56, 161);
}

.middle {
    flex-grow: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.right {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    height: 100%;
}
#mode {
    font-size: 28px;
    color: gray;
    margin-right: 38px;
}
#mode:hover {
    color: #8338a1;
}

#more {
    position: relative;
    font-size: large;
    color: gray;
    margin-right: 16px;
    display: flex;
    align-items: center;
    height: 60%;
    padding: 0 12px;
}
#more:hover {
    color: #8338a1;
    background-color: #ECECEC;
    border-radius: 14px;
}
.options-box {
    position: absolute;
    top: 100%;
    width: 160px;
    right: 0;
}
#more div {
    margin-left: 6px
}
.options-box a{
    display: flex;
    font-size: large;
    color: black;
    padding: 6px 16px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
}
.options-box a:hover{
    background-color: #F7F7F7;
}
#more:hover .options-box {
    display: block;
}
.options-content {
    margin-top: 10px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}
.more-icon {
    margin-top: 6px;
    margin-left: 8px;
    font-size: larger;
}

@media (max-width: 800px) {
    #brand {
        display: none;
    }
    .left {
        width: 120px;
    }
    #logo {
        height: 58px;
        margin: 0;
        margin-right: 20px;
    }
    .middle {
        margin-left: 6px;
    }
}
@media (max-width: 700px) {
    #more-text {
        display: none;
    }
    #more {
        margin-right: 0px;
        margin-left: 16px;
    }
}
</style>
