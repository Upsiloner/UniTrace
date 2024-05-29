<template>
<div class="login-container">
    <!-- image -->
    <div class="image-container">
        <!-- <image src="/login.jpg" alt="Background Image" layout="fill" object-fit="cover" /> -->
        <NuxtImg src="/login.jpg"/>
    </div>

    <!-- data -->
    <div class="form-container">
        <h2 id="welcome">Welcome to UniTrace</h2>
        
        <div class="title">Username:</div>
        <UInput
            class="box"
            icon="i-heroicons-user"
            size="xl"
            color="purple"
            placeholder="Username..."
        />
        
        <div class="title">Password:</div>
        <UInput 
            class="box" 
            size="xl" 
            icon="i-heroicons-lock-closed"
            type="password" 
            color="purple" 
            variant="outline" 
            placeholder="Password..." 
        />
        <div id="checkandlink">
            <UCheckbox class="mt-1" v-model="selected" color="purple" name="Rememberme" label="Remember Me" />
            
            <NuxtLink id="link" to="forget">
                Forget Password?
            </NuxtLink>
        </div>
        <button id="btn">LOGIN</button>
        <div id="toregister">
            No Account? 
            <NuxtLink id="link" to="signup">
                Click to Rigister
            </NuxtLink>
        </div>
    </div>
</div>
</template>

<script>
import { ref } from 'vue';
const username = ref('');
const password = ref('');
const selected = ref(false);

const login = () => {
    // console.log('用户名:', this.username);
    // console.log('密码:', this.password);
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
}

#checkandlink {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    width: 320px; 
    margin: 10px 36px;
}

#toregister {
    margin: 18px 76px;
    align-items: center; 
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
}

#welcome {
    font-size: 36px; 
    font-weight: bold; 
    color: #000000; 
    font-family: sans-serif;
    text-shadow: 2px 2px 5px #c3b6e5; 
    text-align: center;
    margin-top: 10px;
    margin-bottom: 60px;
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
    margin: 10px 36px;
}

.box {
    width: 320px;
    margin: 10px 36px 20px 36px;
}
  
</style>
