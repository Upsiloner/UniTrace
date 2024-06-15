<template>
    <div class="e-muyu">
      <NuxtImg 
        id="signimg" 
        src="/game/woolenfish.png" 
        class="muyu-img" 
        @click="handleClick"
        :style="{ transform: isClicked ? 'scale(0.9)' : 'scale(1)' }"
      />
      <transition name="merit">
        <div v-if="showMerit" class="merit">{{ selected }} +1</div>
      </transition>
      <div class="content">
        <div class="font">
          累计 : {{ merit_num }}
        </div>
        <USelectMenu v-model="selected" :options="people" />
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const showMerit = ref(false);
const isClicked = ref(false);
const merit_num = ref(0);
const audio = new Audio('/game/fish_sound.wav');
const people = ['功德', '财运', '桃花', '颜值'];

const selected = ref(people[0])

const handleClick = async () => {
  merit_num.value++;
  showMerit.value = true;
  setTimeout(() => {
    showMerit.value = false;
  }, 100);
  // 动画效果
  isClicked.value = true;
  setTimeout(() => {
    isClicked.value = false;
  }, 200);
  audio.play();
};
</script>

<style scoped>
.e-muyu {
  position: relative;
  display: inline-block;
}

.muyu-img {
  width: 150px; /* 设置合适的宽度 */
  transition: transform 0.2s ease;
}

.merit {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-family: "deyihei";
  color: red;
  animation: float-up 1s ease forwards;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.font {
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: rgb(80, 79, 79);
  margin: 4px 0 8px 0;
  font-family: "deyihei";
}

@keyframes float-up {
  0% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50px);
  }
}
</style>
