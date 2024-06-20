<!-- layouts/default.vue -->
<template>
    <div class="main-page">
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
    </div>
        
</template>

<script setup>
</script>

<style scoped>
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
}
@media (max-width: 800px) {
    .content {
        margin: 0;
    }
}
</style>
  