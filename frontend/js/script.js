
const API_URL = 'http://localhost:3000/api';

function salvarToken(token) {
    localStorage.setItem('token', token);
}

function obterToken() {
    return localStorage.getItem('token');
}

function removerToken() {
    localStorage.removeItem('token');
}

function headers() {
    const token = obterToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': token
    };
}
