<template>
    <div class="snake-game">
      <canvas ref="gameCanvas" :width="canvasSize" :height="canvasSize"></canvas>
      <div class="controls">
        <div>分数：{{ score }}</div>
        <button @click="startGame" :disabled="isGameStarted">开始游戏</button>
      </div>
      <div class="direction-buttons">
        <button @click="changeDirectionByButton('up')">W</button>
        <button @click="changeDirectionByButton('left')">A</button>
        <button @click="changeDirectionByButton('down')">S</button>
        <button @click="changeDirectionByButton('right')">D</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  const snackbar = useSnackbar();
  const canvasSize = 400;
  const gameCanvas = ref(null);
  const context = ref(null);
  const snake = ref([{ x: 50, y: 50 }]);
  const direction = ref('right');
  const food = ref({ x: 0, y: 0 });
  const gridSize = 10;
  let gameInterval = null;
  const score = ref(0);
  const isGameStarted = ref(false);
  const audio = new Audio('/game/eating_sound.mp3');
  const dead_audio = new Audio('/game/game_over.mp3');
  
  const startGame = () => {
    if (!isGameStarted.value) {
        isGameStarted.value = true;
        context.value = gameCanvas.value.getContext('2d');
        resetGame();
        generateFood();
        gameInterval = setInterval(gameLoop, 100);
        window.addEventListener('keydown', changeDirection);
        score.value = 0;
    }
  };
  
  const resetGame = () => {
    snake.value = [{ x: 50, y: 50 }];
    direction.value = 'right';
  };

  const changeDirectionByButton = (newDirection) => {
    if (newDirection === 'left' && direction.value !== 'right') {
        direction.value = 'left';
    } else if (newDirection === 'up' && direction.value !== 'down') {
        direction.value = 'up';
    } else if (newDirection === 'right' && direction.value !== 'left') {
        direction.value = 'right';
    } else if (newDirection === 'down' && direction.value !== 'up') {
        direction.value = 'down';
    }
    };
  
  const generateFood = () => {
    const maxPosition = canvasSize / gridSize - 1;
    food.value = {
      x: Math.floor(Math.random() * maxPosition) * gridSize,
      y: Math.floor(Math.random() * maxPosition) * gridSize,
    };
  };
  
  const changeDirection = (event) => {
    const key = event.keyCode;
    if (key === 37 && direction.value !== 'right') {
      direction.value = 'left';
    } else if (key === 38 && direction.value !== 'down') {
      direction.value = 'up';
    } else if (key === 39 && direction.value !== 'left') {
      direction.value = 'right';
    } else if (key === 40 && direction.value !== 'up') {
      direction.value = 'down';
    }
  };
  
  const gameLoop = () => {
    moveSnake();
    checkCollision();
    drawGame();
  };
  
  const moveSnake = () => {
    const head = { ...snake.value[0] };
    if (direction.value === 'right') {
      head.x += gridSize;
    } else if (direction.value === 'left') {
      head.x -= gridSize;
    } else if (direction.value === 'up') {
      head.y -= gridSize;
    } else if (direction.value === 'down') {
      head.y += gridSize;
    }
    snake.value.unshift(head);
    if (head.x === food.value.x && head.y === food.value.y) {
      generateFood();
      score.value++;
      audio.play();
    } else {
      snake.value.pop();
    }
  };
  
  const checkCollision = () => {
    const head = snake.value[0];
    if (
      head.x < 0 ||
      head.x >= canvasSize ||
      head.y < 0 ||
      head.y >= canvasSize ||
      snake.value.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      clearInterval(gameInterval);
      snackbar.add({ type: 'warning', text: '游戏结束！' });
      dead_audio.play();
      isGameStarted.value = false;
    }
  };
  
  const drawGame = () => {
  context.value.clearRect(0, 0, canvasSize, canvasSize);

  // Draw snake
  snake.value.forEach((segment, index) => {
    context.value.fillStyle = index === 0 ? '#800080' : '#A686BA'; // Different color for the head
    context.value.beginPath();
    roundRect(context.value, segment.x, segment.y, gridSize, gridSize, 3);
    context.value.fill();
    context.value.closePath();
  });

  // Draw food
  context.value.fillStyle = 'red';
  context.value.beginPath();
  roundRect(context.value, food.value.x, food.value.y, gridSize, gridSize, 3);
  context.value.fill();
  context.value.closePath();
};

const roundRect = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
};


  
  onMounted(() => {
    gameCanvas.value.width = canvasSize;
    gameCanvas.value.height = canvasSize;
  });
  
  onBeforeUnmount(() => {
    clearInterval(gameInterval);
    window.removeEventListener('keydown', changeDirection);
  });
  </script>
  
  <style scoped>
  .snake-game {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  canvas {
    border: 1px dashed #a7a5a5;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  }
  .controls {
    margin-top: 10px;
    display: flex;
    text-align: center;
    justify-content: center;
  }
  .controls div {
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: rgb(80, 79, 79);
    font-family: "deyihei";
    margin: 6px 0
  }
  .controls button {
    padding: 8px 14px;
    font-size: 18px;
    border-radius: 10px;
    width: 180px;
    color: white;
    background-color: black;
  }
  .controls button:hover {
    background-color: purple;
  }
  .direction-buttons {
    display: grid;
    gap: 5px;
    margin-top: 20px;
    position: relative;
  }
  
  .direction-buttons button {
    width: 100px;
    height: 50px;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    background-color: #f0f0f0;
    cursor: pointer;
    font-family: "deyihei";
  }
  
  .direction-buttons button:hover {
    background-color: #e0e0e0;
  }
  
  .direction-buttons button:active {
    transform: scale(0.95);
  }
  .direction-buttons button:nth-child(2) {
    position: absolute;
    top: 30px;
    right: 110px;
  }
  .direction-buttons button:nth-child(4) {
    position: absolute;
    top: 30px;
    left: 110px;
  }
  .direction-buttons button:nth-child(3) {
    position: absolute;
    top: 60px;
  }
  </style>
  