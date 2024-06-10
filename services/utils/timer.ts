export function formatTime(seconds:any) {
    let temp = seconds;
    // 计算分钟数
    const minutes = Math.floor(temp / 60);
    // 计算剩余的秒数
    const remainingSeconds = Math.floor(temp % 60);
  
    // 格式化为两位数的分钟和秒数
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    // 返回格式化的时间字符串
    return `${formattedMinutes}:${formattedSeconds}`;
}