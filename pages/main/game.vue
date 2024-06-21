<template>
    <div class="gamepage">
        <div class="tabs">
            <button 
                v-for="(tab, index) in tabs" 
                :key="index" 
                @click="change(index)"
                :class="{ active: activeTab === index }"
            >
                {{ tab.title }}
            </button>
        </div>
        <div class="tab-content">
            <keep-alive>
                <component :is="currentComponent" />
            </keep-alive>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'navigation',
    keepalive: true
})
useHead({
    title: 'UniTrace -- 娱乐'
})
import { ref } from 'vue';

const activeTab = ref(0);
const Fish = resolveComponent('woodenfish');
const Snake = resolveComponent('snake');
const currentComponent = shallowRef(Snake);
const tabs = [
    { title: '贪吃蛇', component: Snake },
    { title: '电子木鱼', component: Fish },
];
const change = (index) => {
    activeTab.value = index;
    currentComponent.value = tabs[activeTab.value].component;
}
</script>

<style scoped>
/* Tab container styles */
.tabs {
    display: flex;
    justify-content: center;
    text-align: center;
    background-color: #F3F4F6;
    border-radius: 10px;
    padding: 5px 5px;
    position: fixed;
    top: 90px; /* Adjust the top value as needed */
    left: 50%;
    transform: translateX(-50%);
    width: max-content; /* Ensures the tabs don't expand to full width */
    margin-left: 118px;
}
  
/* Tab button styles */
.tabs button {
    padding: 6px 15px;
    width: 130px;
    background-color: #F3F4F6;
    border-radius: 8px;
    color: rgb(135, 135, 135);
    border: none;
    margin: 0 4px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s; /* 添加背景和颜色的过渡效果 */
}
  
/* Tab button hover styles */
.tabs button:hover {
    background-color: #f0f0f0; /* 鼠标悬停时的背景色 */
}

.tab-content {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    text-align: center;
}

.tabs button.active {
    background-color: white;
    color: purple;
}
@media (max-width: 800px) {
    .tabs {
        margin: 0;
    }
}
</style>