export async function UserLogin(name:string, password:string) {
    try {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                password,
            }),
        });
        return response.json();
    } catch (error) {
        console.error('请求失败:', error);
        return { status: -1, message: '请求失败' };  
    }
  }
  