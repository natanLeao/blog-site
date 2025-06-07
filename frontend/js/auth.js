const apiUrl = "http://blog_backend:3000";

function atualizarLinks() {
    const token = localStorage.getItem("token");
    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const logoutBtn = document.getElementById("logout");

    if (token) {
        if (loginLink) loginLink.style.display = "none";
        if (registerLink) registerLink.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "inline-block";
    } else {
        if (loginLink) loginLink.style.display = "inline-block";
        if (registerLink) registerLink.style.display = "inline-block";
        if (logoutBtn) logoutBtn.style.display = "none";
    }
}

async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            alert("Login realizado com sucesso!");
            window.location.href = "../index.html";
        } else {
            alert(data.message || "Erro ao fazer login.");
        }
    } catch (error) {
        alert("Erro de conexão.");
        console.error(error);
    }
}

async function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    try {
        const response = await fetch(`${apiUrl}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "../pages/login.html";
        } else {
            alert(data.message || "Erro ao cadastrar.");
        }
    } catch (error) {
        alert("Erro de conexão.");
        console.error(error);
    }
}

function logout() {
    localStorage.removeItem("token");
    alert("Sessão encerrada.");
    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarLinks();
    
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const logoutBtn = document.getElementById("logout");

    if (loginForm) loginForm.addEventListener("submit", (e) => { e.preventDefault(); login(); });
    if (registerForm) registerForm.addEventListener("submit", (e) => { e.preventDefault(); register(); });
    if (logoutBtn) logoutBtn.addEventListener("click", logout);
});
