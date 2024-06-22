<!-- layouts/default.vue -->
<template>
  <div class="protocol-page">
    <div class="bg"></div>
    <div class="content-wrapper">
        <slot />
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
</script>

<style scoped>
.protocol-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.content-wrapper {
  background-color: #F9F9F9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影 */
  max-width: 800px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 20px 40px 20px;
}
</style>
