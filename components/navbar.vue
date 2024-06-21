<!-- layouts/default.vue -->
<template>

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
        <div class="avatar">
            <avatar />
        </div>
    </nav>

</template>

<script setup>
</script>

<style scoped>

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
    margin-bottom: 92px;
    margin-top: auto;
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
