<template>
<div class="publish">
    <!-- 标题输入框 -->
    <div class="input-group">
        <label class="tit-font" for="title">标题</label>
        <input
            type="text"
            id="title"
            v-model="title"
            maxlength="10"
            placeholder="输入标题（最多10个字）"
        />
        <span class="char-counter">{{ title.length }}/10</span>
    </div>
    
    <!-- 内容输入框 -->
    <div class="input-group">
        <label class="tit-font" for="content">内容</label>
        <textarea
            id="content"
            v-model="content"
            maxlength="800"
            placeholder="输入内容（最多800个字）"
        ></textarea>
        <span class="char-counter">{{ content.length }}/800</span>

        <div class="content-choose">
            <NuxtEmoji @on-select="select">
                <template v-slot:button>
                    <button class="choose">表情😁</button>
                </template>
            </NuxtEmoji>
            <div>
                <button class="choose" @click="topic">话题＃</button>
            </div>
        </div>
    </div>

    <!-- 图片选择栏 -->
    <div class="input-group">
        <label class="tit-font" for="images">选择图片</label>
        <div class="fake-pos">
            <div class="fake-input">
                <UIcon class="file-icon" name="i-heroicons-folder"/>
                <div class="fake-choose">选择文件</div>
                <div>{{ imagePath }}</div>
            </div>
            <input 
                type="file" 
                id="images"
                multiple 
                @change="handleImageUpload"
                accept=".jpg, .jpeg, .png"
            />
        </div>
        <div class="image-preview">
            <img
                v-for="(image, index) in images"
                :key="index"
                :src="image"
                class="preview-img"
                @dblclick="removeImage(index)"
                
            />
        </div>
    </div>

    <!-- 权限设置 -->
    <div class="input-group">
        <label class="tit-font" for="privacy">权限设置</label>
        <div class="privatebar">
            <UToggle color="purple" v-model="isPublic" />
            <p>{{ isPublic ? '公开（所有人可见）' : '私密（仅自己可见）' }}</p>
        </div>
    </div>

    <!-- 清空和发布按钮 -->
    <div class="button-group">
        <button class="btn1" @click="clearForm">清空</button>
        <button class="btn2" @click="submitForm">发布</button>
    </div>
</div>
</template>
  
<script setup>
import { ref } from 'vue';
import { getCurrentTimeString } from '~/services/utils/date'

// 定义响应式变量
const title = ref('');
const content = ref('');
const images = ref([]);
const privacy = ref('public');
const isPublic = ref(true);
const imagePath = ref('未选择文件');
const toast = useToast();
  
// 处理图片上传
const handleImageUpload = (event) => {
    const files = event.target.files;
    const maxAllowedImages = 5;
    if (files.length + images.value.length > maxAllowedImages) {
        event.target.value = null;
        toast.add({ 
            title: '最多只能选择' + maxAllowedImages + '张图片',
            icon: "i-heroicons-information-circle",
            color: "orange"
        });
    } else {
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (e) => {
                images.value.push(e.target.result);
            };
            reader.readAsDataURL(files[i]);
        }
        // 更新文件路径
        imagePath.value = event.target.value.split('\\').pop();
    }
    
};

// 删除图片
const removeImage = (index) => {
    images.value.splice(index, 1);
};
  
// 清空表单
const clearForm = () => {
    title.value = '';
    content.value = '';
    images.value = [];
    isPublic.value = true;
    imagePath.value = '未选择文件';
};
  
// 提交表单
const submitForm = () => {
    if(title.value == '' || content.value == '') {
        toast.add({ 
            title: '请填写标题与内容！',
            icon: "i-heroicons-information-circle",
            color: "orange"
        });
        return;
    }
    if(images.value.length == 0) {
        toast.add({ 
            title: '请至少选择一张图片！',
            icon: "i-heroicons-information-circle",
            color: "orange"
        });
        return;
    }
    const weiboData = {
        title: title.value,
        content: content.value,
        images: images.value,
        public: isPublic.value,
        time: getCurrentTimeString()
    };
    console.log(weiboData);
    // TODO:在这里添加发布微博的逻辑
    toast.add({ 
        title: '发布功能还未更新，敬请期待！',
        icon: "i-heroicons-information-circle",
        color: "orange"
    });
};

// handle emoji and topic
const select = (emoji) => {
    content.value += emoji;
}
const topic = (emoji) => {
    content.value += '#';
}
</script>
  
<style scoped>
.publish {
    width: 600px;
    padding: 1rem;
    border-radius: 8px;
    height: auto;
    margin: 20px auto;
}

.tit-font {
    font-size: 20px;
    font-weight: bold;
}

.input-group {
    margin-bottom: 10px;
}

.input-group label {
    display: block;
    margin-bottom: 0.5rem;
}

.input-group input,
.input-group textarea,
.input-group select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #585858;
    border-radius: 4px;
    background: linear-gradient(
        435deg, 
        #F1F3FB,
        #EBF2FC
    );
}

.char-counter {
    display: block;
    text-align: right;
    margin-top: 0.5rem;
    color: #888;
}

.image-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
    overflow: hidden;
}

#images {
    color: #ccc;
    width: 400px;
    font-size: 16px;
    padding: 8px 10px;
    opacity: 80%;
    opacity: 0%;
}

.fake-pos {
    position: relative;
}

.fake-input {
    position: absolute;
    height: 48px;
    display: flex;
    align-items: center;
    width: 400px;
    border: #585858 solid 1px;
    padding: 8px 8px;
    border-radius: 5px;
}
.fake-input div {
    margin-left: 15px;
}
.file-icon {
    font-size: 24px;
    margin-left: 6px;
    color: gray;
}
.fake-choose {
    color: gray;
}

.preview-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: transform 0.2s ease;
}

.preview-img:hover {
    transform: scale(1.05);
}

.button-group {
    display: flex;
    justify-content: right;
    margin-top: 24px;
}
.button-group button {
    margin-left: 20px;
}

#content {
    min-height: 120px;
    max-height: 300px;
}
.content-choose {
    display: flex;
    margin-bottom: 20px;
    margin-top: -20px;
}
.choose {
    border: rgb(181, 181, 181) solid 1px;
    width: 64px;
    color: rgb(181, 181, 181);
    text-align: center;
    border-radius: 6px;
    padding: 2px 0;
    font-size: 14px;
    margin-right: 8px;
}
.choose:hover {
    border: purple solid 1px;
    color: purple;
}

.input-group input:focus,
.input-group textarea:focus {
    border: rgb(123, 39, 158) solid 1px;
    outline: none;
}
.char-counter {
    margin: 0;
    font-size: 14px;
}
.btn1 {
    padding: 8px 26px;
    border-radius: 6px;
    border: rgb(178, 178, 178) solid 2px;
    cursor: pointer;
    color: black;
}

.btn1:hover {
    color: purple;
    border: purple solid 2px;
}
.btn2 {
    padding: 8px 26px;
    border-radius: 6px;
    border: rgb(178, 178, 178) solid 2px;
    cursor: pointer;
    color: white;
    background-color: black;
}

.btn2:hover {
    background-color: purple;
}
.privatebar {
    display: flex;
    align-items: center;
}
.privatebar p {
    margin-left: 10px;
}
@media (max-width: 800px) {
    .publish {
        width: 400px;
    }
    #images {
        width: 368px;
    }

    .fake-input {
        width: 368px;
    }
}
</style>
  