<!-- layouts/default.vue -->
<template>
    <!-- top bar -->
    <topbar />
    <div class="nav">
        <!-- navigation bar -->
        <navbar />
        <!-- main page area (on the right of the page) -->
        <main class="content">
            <slot />
        </main>
    </div>
        
</template>

<script setup>
</script>

<style scoped>
.nav {
    display: flex;
    height: 100vh;
}

.content {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    height: 100%;
}
</style>
  