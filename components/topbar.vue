<!-- layouts/default.vue -->
<template>
    <div class="top-bar">
        <div class="left">UniTrace</div>
        <div class="middle">
            <div class="search-box">
                <input type="text" placeholder="搜索内容..." class="search-input">
                <UIcon class="clear-icon" name="i-heroicons-x-mark"/>
                <UIcon class="search-icon" name="i-heroicons-magnifying-glass-20-solid"/>
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.top-bar {
    width: 100%;
    display: flex;
    align-items: center;
    height: 70px;
    margin-top: 8px
}
.left {
    width: 240px;
    margin-left: 10px;
    border-right: #DDDFE2 dashed 2px;
    color: rgb(131, 56, 161);
}
.search-box {
    width: 40%;
    height: 70%;
    margin: 0;
    display: flex;
    align-items: center;
    background-color: #DDDFE2;
    border-radius: 24px;
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
    font-size: 2rem;
    color: gray;
    margin-right: 15px;
}

.search-icon:hover {
    color: rgb(131, 56, 161);
}

.clear-icon {
    margin-left: auto;
    font-size: 2rem;
    color: gray;
    margin-right: 15px;
    width: 2rem;
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
    background-color: gray;
    margin-left: auto;
}
</style>
