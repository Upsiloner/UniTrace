<template>
    <div class="publish-content">
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
    width: 1400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 14px;
    padding: 20px 0;
    min-height: 700px;
    height: 100%;
    min-height: 80vh;
    position: relative;
    display: flex;
    align-items: center;
    background: linear-gradient(
        45deg, 
        rgb(246, 242, 250),
        rgb(231, 243, 253)
    );
}

</style>