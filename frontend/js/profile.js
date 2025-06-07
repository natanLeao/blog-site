const apiUrl = "http://blog_backend:3000";

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "../pages/login.html";
        return;
    }

    // Buscar postagens do usuário
    const response = await fetch(`${apiUrl}/posts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const posts = await response.json();
    if (response.ok) {
        displayUserPosts(posts);
    } else {
        alert("Erro ao carregar postagens!");
    }
});

// Exibir postagens do usuário
function displayUserPosts(posts) {
    const userPostsContainer = document.getElementById("user-posts");
    userPostsContainer.innerHTML = "";

    if (posts.length === 0) {
        userPostsContainer.innerHTML = "<p>Você ainda não criou nenhuma postagem.</p>";
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="editPost(${post.id})">Editar</button>
            <button onclick="deletePost(${post.id})">Deletar</button>
        `;
        userPostsContainer.appendChild(postElement);
    });
}

// Criar nova postagem
document.getElementById("new-post").addEventListener("click", () => {
    window.location.href = "../pages/post.html";
});


function editPost(postId) {
    window.location.href = `../pages/post.html?id=${postId}`;
}

async function deletePost(postId) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiUrl}/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        alert("Postagem deletada!");
        location.reload();
    } else {
        alert("Erro ao deletar postagem!");
    }
}
