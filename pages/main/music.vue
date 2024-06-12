<template>
    <div class="musicpage">
        <musicplayer />
    </div>
    
</template>

<script setup>
definePageMeta({
    layout: 'navigation',
    keepalive: true
})
useHead({
    title: 'UniTrace -- 音乐'
})

</script>

<style>
.musicpage {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>