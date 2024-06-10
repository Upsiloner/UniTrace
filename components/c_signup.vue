<template>
    <div class="signup-container">
        <!-- image -->
        <div class="image-container">
            <!-- <image src="/login.jpg" alt="Background Image" layout="fill" object-fit="cover" /> -->
            <NuxtImg id="signimg" src="/launch_page/signup.jpg" />
        </div>
    
        <!-- data -->
        <div class="form-container">
            <div class="form-inner">
                <h2 id="welcome">注册你的账户</h2>
                
                <div class="title">用户名:</div>
                <UInput
                    class="box"
                    icon="i-heroicons-user"
                    size="xl"
                    color="purple"
                    placeholder="输入用户名..."
                    v-model="username"
                />
                <div class="prompt">{{ name_msg }}</div>
                
                <div class="title">邮箱:</div>
                <UInput
                    class="box"
                    icon="i-heroicons-envelope"
                    size="xl"
                    color="purple"
                    placeholder="输入邮箱..."
                    v-model="email"
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
                        v-model="vfycode"
                    />
                    <button 
                        :class="{ 'btn1': !isDisabled, 'btn1-disabled': isDisabled }" 
                        :disabled="isDisabled" 
                        @click="SendEmail"
                    >
                        {{ buttonText }}
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
                    v-model="password1"
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
                    v-model="password2"
                />
                <div class="prompt">{{ pswd2_msg }}</div>
                <div id="buttom">
                    <NuxtLink id="link" to="login">
                    <UIcon name="i-heroicons-arrow-uturn-left" />
                    返回
                    </NuxtLink>
                    <button class="btn2" @click="resetInfo">重置</button>
                    <button class="btn3" @click="signup">注册</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from 'vue';
import { UserSignupemail, UserSignup } from '~/services/api/auth';
import { useRouter } from 'vue-router';
const router = useRouter();

const username = ref('');
const email = ref('');
const password1 = ref('');
const password2 = ref('');
const vfycode = ref('');

const name_msg = ref('');
const email_msg = ref('');
const code_msg = ref('');
const pswd1_msg = ref('');
const pswd2_msg = ref('');

// logics of sending email
let countdownDuration = 60; // unit: s
let countdownTimer = null;
let isDisabled = ref(false);
let buttonText = ref('发送邮件');
async function SendEmail() {
    try {
        if(username.value == "" || email.value == "") {
            alert('请输入用户名与邮箱！');
            return;
        }
        isDisabled.value = true;
        buttonText.value = `重新发送(${countdownDuration}秒)`;
        countdownTimer = setInterval(() => {
            countdownDuration--;
            buttonText.value = `重新发送(${countdownDuration}秒)`;
            if (countdownDuration <= 0) {
                clearInterval(countdownTimer);
                countdownDuration = 60;
                isDisabled.value = false;
                buttonText.value = '发送邮件';
            }
        }, 1000);
        const data = await UserSignupemail(email.value, username.value)
        if (data.code === 200) {
            localStorage.setItem('SignupVfySuffix', data.suffix);
            alert("邮件发送成功！");
        } else {
            alert(data.msg);
        }
    } catch (error) {
        console.error('发送失败:', error);
        alert('发送失败！');
    }
}

// Regular expressions for validation
const usernamePattern = /^[^\s]{1,10}$/; // No spaces, length up to 10
const passwordPattern = /^[A-Za-z0-9!@#$%^&*()_+=-]{6,18}$/; // Letters, numbers, and symbols, length 6-18
const emailPattern = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const codePattern = /^[a-zA-Z0-9]{6}$/;

const validateUsername = computed(() => {
    if (!username.value) {
        return '用户名不能为空';
    }
    if (!usernamePattern.test(username.value)) {
        return '用户名长度不超过10个字符且不含空格';
    }
    return '';
});

const validateCode = computed(() => {
    if (!vfycode.value) {
        return '验证码不能为空';
    }
    if (!codePattern.test(vfycode.value)) {
        return '验证码为6位字母';
    }
    return '';
});

const validatePassword = (password) => {
    if (!password.value) {
        return '密码不能为空';
    }
    if (!passwordPattern.test(password.value)) {
        return '密码必须为6-18位的字母、数字或符号';
    }
    return '';
};

const validateEmail = computed(() => {
    if (!email.value) {
        return '邮箱不能为空';
    }
    if (!emailPattern.test(email.value)) {
        return '请输入正确的邮箱格式';
    }
    return '';
});

// Watchers to update messages
watch(username, () => {
    name_msg.value = validateUsername.value;
});

watch(password1, () => {
    pswd1_msg.value = validatePassword(password1);
});

watch(password2, () => {
    pswd2_msg.value = validatePassword(password2);
});

watch(email, () => {
    email_msg.value = validateEmail.value;
});

watch(vfycode, () => {
    code_msg.value = validateCode.value;
});

// signup
async function signup() {
    try {
        if(username.value == "" || password1.value == "" || password2.value == "" || email.value == "" || vfycode.value == "") {
            alert('请输入完整信息！');
            return;
        }
        const suffix = localStorage.getItem('SignupVfySuffix') || '';
        const data = await UserSignup(username.value, email.value, password1.value, vfycode.value, suffix);
        if (data.code === 200) {
            alert("注册成功，请登录！")
            router.push('/login');
        } else {
            alert(data.msg);
        }
    } catch (error) {
        console.error('注册失败:', error);
        alert('注册失败！');
    }
}

// reset
const resetInfo = () => {
    reset(username, email, password1, password2, vfycode, name_msg, email_msg, code_msg, pswd1_msg, pswd2_msg);
}
const reset = (...refs) => {
    refs.forEach(ref => {
        ref.value = '';
    });
};

</script>

<style scoped>
.signup-container {
    display: flex;
    border-radius: 10px;
    overflow: hidden;
    width: 850px;
    height: 700px;
    box-shadow: 0 0 10px #bdb0dd33;
    transition: width 0.2s ease;
}

.image-container {
    width: 400px;
    position: relative;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

}

#signimg {
    width: 100%; 
    height: 100%; 
    object-fit: cover;
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
    font-size: 30px; 
    font-weight: bold; 
    color: #000000; 
    font-family: sans-serif;
    text-shadow: 2px 2px 5px #c3b6e5; 
    text-align: center;
    margin-top: 10px;
    margin-bottom: 26px;
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

.btn1-disabled {
    background-color: #F9F9F9; 
    font-size: 14px;
    color: #9CA3AF; 
    border: 2px solid rgba(121, 121, 121, 0.242); 
    border-radius: 5px; 
    padding: 0px 14px; 
    cursor: pointer; 
    width: 100px;   
    height: 46px;
    margin-top: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    margin: 0px 36px;
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
@media (max-width: 1000px) {
    .signup-container {
        width: 450px;
    }
    .image-container {
        display: none;
    }
}  
@media (max-width: 800px) {
    .signup-container {
        width: 400px;
    }
    .form-inner {
        margin-left: -12px;
    }
}
</style>
    