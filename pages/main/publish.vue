<template>
    <div class="publish-content">
        <div class="background-image"></div>
        <publish />
    </div>

</template>

<script setup>
definePageMeta({
    layout: 'navigation',
    keepalive: true
})
useHead({
    title: 'UniTrace -- 发布'
})
</script>

<style>
.publish-content {
    width: 1100px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 14px;
    padding: 0;
    min-height: 700px;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
}
.background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/public/publish_bg.png');
    background-size: cover;
    opacity: 22%;
    border-radius: 14px;
    pointer-events: none;
}
</style>