export async function UserLogin(username:string, password:string) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        const data = await response.json();
        return { status: data.status, message: data.message };
    } catch (error) {
        console.error('登录失败:', error);
        return { status: -1, message: '登录失败' };  
    }
  }
  