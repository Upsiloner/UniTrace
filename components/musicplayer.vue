<template>
    <div class="music-player" @click="allreact">
        <!-- Cover Image -->
        <div class="cover-image">
            <NuxtImg id="signimg" :src="cover" />
        </div>
    
        <!-- Song Information -->
        <div class="song-info">
            <h2 class="song-title">{{ song_title }}</h2>
            <p class="artist">{{ artist_name }}</p>
        </div>
    
        <!-- Progress Bar -->
        <div class="progress-bar">
            <div class="time-progress">{{ current_progress_bar }}</div>
            <URange v-model="currentTime" :min="0" :max="duration" class="progress" color="purple" @input="onProgressChange" />
            <div class="time-progress">{{ duration_bar }}</div>
        </div>

        <!-- Choose Bar -->
        <div class="choose-bar">
            <UIcon class="collect" :class="{ 'active': isActive }" @click="toggleColor" name="i-heroicons-heart-solid" />
            <UIcon class="change-music" name="i-heroicons-chevron-double-left-16-solid" @click="last_song" />
            <div @click="togglePlay" class="play-button">
                <UIcon class="play-icon" :name="isPlaying ? 'i-heroicons-pause-20-solid' : 'i-heroicons-play-solid'"/>
            </div>
            <UIcon class="change-music" name="i-heroicons-chevron-double-right-16-solid" @click="next_song" />
            <UIcon class="choose-music" name="i-heroicons-bars-3-bottom-left-16-solid" @click="toggleSongList" />
            <div v-if="showSongList" class="song-list">
                <ul>
                    <li 
                        v-for="(song, index) in musicList" 
                        :key="index" 
                        @click="chooseMisic(index)"
                        :class="{ 'selected': selectedIndex === index }"
                    >
                        {{ song.title }} - {{ song.artist }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { formatTime } from '~/services/utils/timer';
import { musicList } from '~/public/music/musicConfig';
const snackbar = useSnackbar();
const showSongList = ref(false);
const cover = ref('/music_cover.png');
const isPlaying = ref(false);
const current_progress_bar = ref("00:00");
const duration_bar = ref("00:00");
let pregressChangeTime = 0;
const currentTime = ref(0);
const duration = ref(0);
const currentIndex = ref(0);
let currentSong = musicList[currentIndex.value];
const selectedIndex = ref(currentIndex.value);
let songNum = musicList.length;
const audio = ref(new Audio(currentSong.path));
const artist_name = ref(currentSong.artist);
const song_title = ref(currentSong.title);

// bgein or stop the music
const togglePlay = () => {
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

// 监听音频加载完成事件
onMounted(() => {
    audio.value.addEventListener('loadedmetadata', () => {
        duration.value = audio.value.duration;
        duration_bar.value = formatTime(duration.value);
    });
});

// 监听音频播放时间变化事件
watch(currentTime, () => {
    if(currentTime.value == duration.value) {
        // audio.value.currentTime = 0;
        // isPlaying.value = !isPlaying.value;
        next_song();
    }
    current_progress_bar.value = formatTime(currentTime.value);
});

// 监听音频播放进度
audio.value.addEventListener('timeupdate', () => {
    currentTime.value = audio.value.currentTime;
});

// 进度条变化事件处理函数
const onProgressChange = () => {
    pregressChangeTime = currentTime.value;
    audio.value.currentTime = pregressChangeTime;
};

// music collection
const isActive = ref(false);
const toggleColor = () => {
    isActive.value = !isActive.value;
    if(isActive.value) {
        snackbar.add({ type: 'success', text: '成功收藏<' + song_title.value + '>' });
    } else {
        snackbar.add({ type: 'success', text: '取消收藏<' + song_title.value + '>' })
    }
}

// change music
const last_song = () => {
    if(songNum <= 1) {
        snackbar.add({ type: 'warning', text: '曲库还未更新，敬请期待~' })
    }
    if(currentIndex.value == 0) {
        currentIndex.value = musicList.length - 1;
    } else {
        currentIndex.value  = currentIndex.value - 1;
    }
    selectedIndex.value = currentIndex.value;
    currentSong = computed(() => musicList[currentIndex.value]);
    audio.value.src = currentSong.value.path;
    artist_name.value = currentSong.value.artist;
    song_title.value = currentSong.value.title;
    audio.value.load();
    if(isPlaying.value) {
        audio.value.play();
    } else {
        audio.value.pause();
    }
}
const next_song = () => {
    if(songNum <= 1) {
        snackbar.add({ type: 'warning', text: '曲库还未更新，敬请期待~' })
    }
    currentIndex.value = (currentIndex.value + 1) % songNum;
    selectedIndex.value = currentIndex.value;
    currentSong = computed(() => musicList[currentIndex.value]);
    audio.value.src = currentSong.value.path;
    artist_name.value = currentSong.value.artist;
    song_title.value = currentSong.value.title;
    audio.value.load();
    if(isPlaying.value) {
        audio.value.play();
    } else {
        audio.value.pause();
    }
}

// choose music
const toggleSongList = () => {
    showSongList.value = !showSongList.value;
};
const allreact = (event) => {
    if(showSongList.value && !event.target.classList.contains('choose-music')) showSongList.value = !showSongList.value;
};
const chooseMisic = (index) => {
    if(currentIndex.value != index) {
        currentIndex.value = index;
        selectedIndex.value = index;
        currentSong = computed(() => musicList[currentIndex.value]);
        audio.value.src = currentSong.value.path;
        artist_name.value = currentSong.value.artist;
        song_title.value = currentSong.value.title;
        audio.value.load();
        if(isPlaying.value) {
            audio.value.play();
        } else {
            audio.value.pause();
        }
    }
    showSongList.value = !showSongList.value;
};

</script>

<style>
.music-player {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 28px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    width: 400px;
}
  
.cover-image {
    overflow: hidden;
    border-radius: 10%;
    margin-bottom: 20px;
    width: 300px;
    height: 300px;
    object-fit: cover;
    margin-bottom: 20px;
    transition: width 0.2s ease;
}
  
.cover-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
  
.song-info {
    text-align: center;
    margin-bottom: 18px;
}
  
.song-title {
    font-size: 24px;
    margin-bottom: 5px;
}
  
.artist {
    font-size: 16px;
    color: #666;
}
  
.music-player {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: width 0.2s ease;
}

.info {
    text-align: center;
    margin-bottom: 20px;
}

.progress-bar {
    width: 100%;
    display: flex;
    align-items: center;
}

.progress {
    width: 80%;
    margin: 0 10px;
}


.time-progress {
    color: gray;
    font-size: 14px;
}

.choose-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 26px;
    width: 100%;
    position: relative;
}

.play-button {
    margin: 0 16px;
    width: 46px;
    height: 46px;
    border: #aa75e9 solid 2px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.play-button:hover {
    background-color: #EFEFEF;
}

.play-icon {
    color: #9634f1;
    font-size: 28px;
}

.change-music {
    color: gray;
    font-size: 34px;
}
.change-music:hover {
    color: #9634f1;
}

.collect {
    color: rgb(164, 164, 164);
    font-size: 30px;
    margin-right: auto;
}
.collect:hover{
    color: gray;
}
.collect.active {
    color: rgb(214, 30, 30);
}

.choose-music {
    color: gray;
    font-size: 30px;
    margin-left: auto;
}
.choose-music:hover {
    color: #9634f1;
}

.song-list {
    position: absolute;
    bottom: 40px;
    right: 0px;
    width: 230px;
    max-height: 280px;
    overflow-y: auto;
    background: linear-gradient(
        45deg, 
        rgba(244, 234, 255, 1),
        rgba(230, 243, 255, 1),
        rgba(240, 255, 240, 0.9)
    );
    border: 2px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 14px;
    z-index: 1000;
    
}
  
.song-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
  
.song-list li {
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.902);
    padding-left: 24px;
    cursor: pointer;
    white-space: nowrap; /* 防止文字换行 */
    overflow: hidden;
    text-overflow: ellipsis; /* 溢出时显示省略号 */
}

.song-list li:hover {
    background-color: #E5E7EB;
    border-radius: 10px;
}
  
.song-list li:last-child {
    border-bottom: none;
}

.song-list li.selected {
    color: #A856F5;
    font-weight: bold;
}
@media (max-width: 600px) {
    .music-player {
        width: 330px;
    }
    .cover-image {
        width: 250px;
        height: 250px;
    }
    .play-button {
        margin: 0;
    }
    .song-list {
        width: 170px;
    }
    .song-list li {
        padding-left: 15px;
    }
}
</style>