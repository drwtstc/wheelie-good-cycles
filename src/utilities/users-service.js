import * as usersAPI from './users-api'

export async function signUp(userData) {
    const token = await usersAPI.signUp(userData);
    console.log(token)
    localStorage.setItem('token', token);
    return getUser();
}


export async function login(credentials) {
    const token = await usersAPI.login(credentials);
    localStorage.setItem('token', token);
    return getUser();
}


export function getToken(){
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    if (payload.exp < Date.now() / 1000) {
        // Token has expired - remove it from localStorage
        localStorage.removeItem('token');
        return null;  
    }
    return token;
}

export function checkToken() {
    return usersAPI.checkToken()
        .then(dateStr => new Date(dateStr))    
}

export function getUser() {
    console.log('checking')
    const token = getToken();
    return token ? JSON.parse(window.atob(token.split('.')[1])).user : null; 
}


export async function logOut() {
    localStorage.removeItem('token');
}

