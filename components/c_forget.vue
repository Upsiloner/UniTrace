<template>
  <div class="signup-container">
      <!-- image -->
      <div class="image-container">
          <!-- <image src="/login.jpg" alt="Background Image" layout="fill" object-fit="cover" /> -->
          <NuxtImg id="forgetimg" src="/launch_page/forget.jpg" />
      </div>
  
      <!-- data -->
      <div class="form-container">
          <h2 id="welcome">找回你的密码</h2>
          
          
          <div class="title">邮箱:</div>
          <UInput
              class="box"
              icon="i-heroicons-envelope"
              size="xl"
              color="purple"
              placeholder="输入邮箱..."
          />
          <div class="prompt">{{ email_msg }}</div>

          <div class="title">验证码:</div>
          <div class="flex">
              <UInput
                  class="verify"
                  icon="i-heroicons-key"
                  size="xl"
                  color="purple"
                  placeholder="输入验证码..."
              />
              <button class="btn1">
                发送<UIcon name="i-heroicons-paper-airplane" />
              </button>
          </div>
          <div class="prompt">{{ code_msg }}</div>

          <div class="title">密码:</div>
          <UInput 
              class="box" 
              size="xl" 
              icon="i-heroicons-lock-closed"
              type="password" 
              color="purple" 
              variant="outline" 
              placeholder="设置密码..." 
          />
          <div class="prompt">{{ pswd1_msg }}</div>
          <UInput 
              class="box" 
              size="xl" 
              icon="i-heroicons-lock-closed"
              type="password" 
              color="purple" 
              variant="outline" 
              placeholder="重复密码..." 
          />
          <div class="prompt">{{ pswd2_msg }}</div>
          <div id="buttom">
              <NuxtLink id="link" to="login">
              <UIcon name="i-heroicons-arrow-uturn-left" />
              返回
              </NuxtLink>
              <button class="btn2">重置</button>
              <button class="btn3">提交</button>
          </div>

      </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
const username = ref('');
const password = ref('');
const selected = ref(false);

const email_msg = ref('');
const code_msg = ref('');
const pswd1_msg = ref('');
const pswd2_msg = ref('');

const login = () => {
  // console.log('用户名:', this.username);
  // console.log('密码:', this.password);
}
</script>

<style scoped>
.signup-container {
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  width: 850px;
  height: 650px;
  box-shadow: 0 0 10px #bdb0dd33;
}

.image-container {
  width: 400px;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

}

#forgetimg {
  width: 100%; 
  height: 100%; 
  object-fit: cover;
}

.form-container {
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
}

#welcome {
  font-size: 36px; 
  font-weight: bold; 
  color: #000000; 
  font-family: sans-serif;
  text-shadow: 2px 2px 5px #c3b6e5; 
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px;
}

.btn1 {
  background-color: #F9F9F9; 
  color: rgb(0, 0, 0); 
  border: 2px solid rgba(121, 121, 121, 0.242); 
  border-radius: 5px; 
  padding: 8px 14px; 
  cursor: pointer; 
  width: 100px;
  height: 46px;
  margin-top: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn1:hover {
  border: 2px solid #A855F7; 
  color: rgb(121, 57, 185); 
}

.btn2 {
  background-color: #F9F9F9; 
  color: rgb(0, 0, 0); 
  border: 2px solid rgba(121, 121, 121, 0.242); 
  border-radius: 5px; 
  padding: 8px 20px; 
  cursor: pointer; 
  width: 94px;
  margin-left: 58px;
}

.btn2:hover {
  border: 2px solid #A855F7; 
  color: rgb(121, 57, 185); 
} 

.btn3 {
  background-color: black; 
  color: white; 
  border: 2px solid rgba(121, 121, 121, 0.242); 
  border-radius: 5px; 
  padding: 8px 18px; 
  cursor: pointer; 
  width: 100px;
  margin-left: 10px;
}

.btn3:hover {
  background-color: rgb(121, 57, 185); 
} 

.title {
  font-size: 20px; 
  font-weight: bold; 
  color: #000000; 
  font-family: sans-serif;
  margin: 5px 36px;
}

.box {
  width: 320px;
  margin: 3px 36px 0px 36px;
}

.verify {
  width: 210px;
  margin: 3px 10px 0px 36px;
}

#link {
  color: gray;
  margin-left: 36px;
}


#link:hover {
  color: #754adb;
}

#buttom {
  margin-top: 5px;
}

.prompt {
  color: red;
  margin-left: 36px;
  height: 28px;
}
  
</style>
  