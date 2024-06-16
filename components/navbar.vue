<!-- layouts/default.vue -->
<template>
    <UIcon name="i-heroicons-swatch" @click="isOpen = true" class="bar-ctl"/>
    <USlideover 
        v-model="isOpen" 
        side="left"
        :ui="{
            width: 'w-screen max-w-0',
        }"
    >
        <nav class="nav-bar">
            <router-link to="/main/square" active-class="active">
                <div class="nav-icon"><UIcon name="i-heroicons-globe-americas" /></div>
                广场
            </router-link>
            <router-link to="/main/publish" active-class="active">
                <div class="nav-icon"><UIcon name="i-heroicons-arrow-up-tray-20-solid" /></div>
                发布
            </router-link>
            <router-link to="/main/notification" active-class="active">
                <div class="nav-icon"><UIcon name="i-heroicons-bell" /></div>
                通知
            </router-link>
            <router-link to="/main/music" active-class="active">
                <div class="nav-icon"><UIcon name="i-heroicons-musical-note" /></div>
                音乐
            </router-link>
            <router-link to="/main/game" active-class="active">
                <div class="nav-icon"><UIcon name="i-heroicons-cube" /></div>
                娱乐
            </router-link>
        </nav>
        <div class="avatar">
            <avatar />
        </div>
    </USlideover>
</template>

<script setup>
import { ref } from 'vue';
const isOpen = ref(false);
</script>

<style scoped>
.bar-ctl {
    position: fixed;
    font-size: 30px;
    margin-left: 18px;
    color: rgb(177, 177, 177);
}
.bar-ctl:hover {
    color: rgb(178, 143, 185);
    transform: rotate(90deg);
    transition: transform 0.2s ease;
}

.nav-bar {
    background-color: white;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    width: 232px;
    padding: 1rem;
    margin-left: 10px;
    height: 100vh;
    border-right: #DDDFE2 dashed 2px;
    position: fixed;
    overflow: hidden;
    transition: width 0.2s ease;
}

.nav-bar a {
    color: black;
    width: 195px;
    text-decoration: none;
    padding: 15px 20px 10px 30px;
    display: flex;
    font-size: large;
    font-weight: bold;
    border-radius: 16px;
    margin-bottom: 1rem;
    transition: background-color 0.3s ease;
}

.nav-bar a:hover {
    background-color: #EDE1FF;
}

.nav-bar a:hover > div{
    transform: translateY(-5px);
    transition: transform 0.3s ease;
}

.nav-bar a.active {
    background-color: #EDE1FF;
}

.nav-icon {
    margin-right: 8px;
    font-size: larger;
}
.avatar {
    margin: auto auto 18px 28px;
    z-index: 10;
}
@media (max-width: 800px) {
    .nav-bar {
        width: 170px;
    }
    .nav-bar a {
        padding-left: 0;
        width: 136px;
    }
    .nav-icon {
        padding-left: 20px;
        margin-right: 20px;
    }
    .avatar {
        margin-left: 62px;
    }
}
</style>
