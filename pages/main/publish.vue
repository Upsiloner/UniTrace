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
</script>

<style>
.publish-content {
    width: 1100px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 14px;
    padding: 0;
    position: relative;
}
.background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/public/test.png');
    background-size: cover;
    opacity: 26%;
    border-radius: 14px;
    pointer-events: none;
}
</style>