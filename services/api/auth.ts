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

export async function UserSignup(name:string, email:string, password:string, captcha:string, suffix:string) {
    try {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                captcha,
                suffix
            }),
        });
        return response.json();
    } catch (error) {
        console.error('请求失败:', error);
        return { status: -1, message: '请求失败' };  
    }
}

export async function UserSignupemail(email:string, name:string) {
    try {
        const response = await fetch('/api/user/signupemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                name,
            }),
        });
        return response.json();
    } catch (error) {
        console.error('请求失败:', error);
        return { status: -1, message: '请求失败' };  
    }
}

export async function UserGetinfo() {
    try {
        const union_id = localStorage.getItem('union_id');
        const token = localStorage.getItem('token');
        const url = new URL(`/api/user/${union_id}`, window.location.origin);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        });
        return response.json();
    } catch (error) {
        console.error('请求失败:', error);
        return { status: -1, message: '请求失败' };
    }
}


  