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
    </nav>
</template>

<script setup>
</script>

<style scoped>


.nav-bar {
    display: flex;
    flex-direction: column;
    width: 240px;
    padding: 1rem;
    margin-left: 10px;
    height: 100vh;
    border-right: #DDDFE2 dashed 2px
}

.nav-bar a {
    color: black;
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
    background-color: #DDDFE2;
}

.nav-bar a.active {
    background-color: #DDDFE2;
}

.nav-icon {
    margin-right: 8px;
    font-size: larger;
}
</style>
