
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

const randomColors = ['#fff8b3', '#d1f7c4', '#c7ecfa', '#fde2e2', '#e0c7f5', '#fce4ec', '#e0f7fa'];

function aplicarEstiloPostIts() {
  const posts = document.querySelectorAll('.post');
  posts.forEach(post => {
    const cor = randomColors[Math.floor(Math.random() * randomColors.length)];
    const angulo = (Math.random() * 4 - 2).toFixed(1); // de -2 a +2 graus
    post.style.backgroundColor = cor;
    post.style.transform = `rotate(${angulo}deg)`;
  });
};

document.addEventListener('DOMContentLoaded', aplicarEstiloPostIts);
