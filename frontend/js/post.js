document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (postId) {
        document.getElementById("pageTitle").innerText = "Editar Postagem";
        carregarPost(postId, token);
    }

    document.getElementById("postForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;

        const method = postId ? "PUT" : "POST";
        const endpoint = postId ? `http://localhost:3000/posts/${postId}` : "http://localhost:3000/posts";

        const response = await fetch(endpoint, {
            method: method,
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": token 
            },
            body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
            window.location.href = "../index.html";
        } else {
            alert("Erro ao salvar postagem!");
        }
    });
});

async function carregarPost(postId, token) {
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        headers: { "Authorization": token },
    });

    if (response.ok) {
        const post = await response.json();
        document.getElementById("title").value = post.title;
        document.getElementById("content").value = post.content;
    } else {
        alert("Erro ao carregar postagem!");
        window.location.href = "../index.html";
    }
}
