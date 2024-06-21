<!-- layouts/default.vue -->
<template>
    <div class="main-page">
        <!-- top bar -->
        <topbar />
        <div class="nav">
            <!-- navigation bar -->
            <template v-if="isLargeScreen">
                <navbar />
            </template>
            <template v-else>
                <UIcon name="i-heroicons-swatch" @click="isOpen = true" class="bar-ctl" />
                <USlideover 
                    v-model="isOpen" 
                    side="left"
                    :ui="{
                        width: 'w-screen max-w-0',
                    }"
                >
                    <navbar />
                </USlideover>
            </template>
            <!-- main page area (on the right of the page) -->
            <main class="content">
                <slot />
            </main>
        </div>
    </div>
        
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useWindowSize } from '@vueuse/core';

const isOpen = ref(false);
const { width } = useWindowSize();
const isLargeScreen = computed(() => width.value > 800);
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


.main-page {
    overflow-y: hidden;
}

.nav {
    display: flex;
    height: 100%;
    padding-top: 88px;
}

.content {
    margin: 0 20px 6px 20px;
    flex-grow: 1;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 236px;
    transition: margin-left 0.2s ease;
}
@media (max-width: 800px) {
    .content {
        margin: 0;
    }
}
</style>
  