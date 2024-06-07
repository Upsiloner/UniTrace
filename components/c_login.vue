<template>
<div class="login-container">
    <!-- image -->
    <div class="image-container">
        <!-- <image src="/login.jpg" alt="Background Image" layout="fill" object-fit="cover" /> -->
        <NuxtImg id="loginimg" src="/launch_page/login.jpg"/>
    </div>

    <!-- data -->
    <div class="form-container">
        <div class="form-inner">
            <h2 id="welcome">欢迎来到宇迹</h2>
            
            <div class="title">用户名:</div>
            <UInput
                class="box"
                icon="i-heroicons-user"
                size="xl"
                color="purple"
                placeholder="输入用户名..."
            />
            <div class="prompt">{{ name_msg }}</div>
            
            <div class="title">密码:</div>
            <UInput 
                class="box" 
                size="xl" 
                icon="i-heroicons-lock-closed"
                type="password" 
                color="purple" 
                variant="outline" 
                placeholder="输入密码..." 
            />
            <div class="prompt">{{ pswd_mag }}</div>

            <div id="checkandlink">
                <UCheckbox class="mt-1" v-model="selected" color="purple" name="Rememberme" label="记住密码" />
                
                <NuxtLink id="link" to="forget">
                    忘记密码？
                </NuxtLink>
            </div>
            <button id="btn" @click="login">登录</button>
            <div id="toregister">
                没有账户？
                <NuxtLink id="link" to="signup">
                    点此注册
                </NuxtLink>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const username = ref('');
const password = ref('');
const selected = ref(false);

const name_msg = ref('');
const pswd_mag = ref('');

const login = () => {
    // console.log('用户名:', this.username);
    // console.log('密码:', this.password);
    router.push("main");
}
</script>

<style scoped>
.login-container {
    display: flex;
    border-radius: 10px;
    overflow: hidden;
    width: 850px;
    height: 600px;
    box-shadow: 0 0 10px #bdb0dd33;
    transition: width 0.2s ease;
}

#checkandlink {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    width: 320px; 
    margin: 10px 36px;
}

#toregister {
    margin: 18px 116px;
    align-items: center; 
}

#loginimg {
    width: 100%; 
    height: 100%; 
    object-fit: cover;
}

.image-container {
    width: 400px;
    position: relative;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.form-container {
    flex: 1;
    padding: 20px;
    background-color: #f9f9f9;
    display: flex;
    justify-content: center;
    align-items: center;
}

#welcome {
    font-size: 36px; 
    font-weight: bold; 
    color: #000000; 
    font-family: sans-serif;
    text-shadow: 2px 2px 5px #c3b6e5; 
    text-align: center;
    margin-top: 10px;
    margin-bottom: 54px;
}

#link {
    color: gray;
}


#link:hover {
    color: #754adb;
}

#btn {
    background-color: black; 
    color: white; 
    border: 2px solid rgba(121, 121, 121, 0.242); 
    border-radius: 5px; 
    padding: 8px 24px; 
    cursor: pointer; 
    width: 320px;
    margin: 20px 36px;
}

#btn:hover {
    background-color: rgb(121, 57, 185); 
}

.title {
    font-size: 20px; 
    font-weight: bold; 
    color: #000000; 
    font-family: sans-serif;
    margin: 8px 36px;
}

.box {
    width: 320px;
    margin: 10px 36px 1px 36px;
}

.prompt {
    color: red;
    margin-left: 36px;
    height: 28px;
}
@media (max-width: 1000px) {
    .login-container {
        width: 450px;
    }
    .image-container {
        display: none;
    }
}
@media (max-width: 800px) {
    .login-container {
        width: 400px;
    }
    .form-inner {
        margin-left: -12px;
    }
}
</style>
