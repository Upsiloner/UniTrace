<template>
    <div class="music-player">
        <audio ref="audio" :src="musicSrc"></audio>
        <button @click="togglePlay">{{ isPlaying ? '暂停音乐' : '播放音乐' }}</button>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'navigation'
})



import { ref } from 'vue';

const isPlaying = ref(false);
const audio = ref(null);
const currentTime = ref(0);
const duration = ref(0);
const progress = ref(0);

const musicSrc = '/music.mp3';

const togglePlay = () => {
    if (isPlaying.value) {
        audio.value.pause();
    } else {
        audio.value.play();
    }
    isPlaying.value = !isPlaying.value;
};
</script>

<style>
</style>