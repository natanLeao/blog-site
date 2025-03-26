async function carregarPosts() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/posts", {
        headers: { "Authorization": token },
    });

    const posts = await response.json();
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = posts.map(post => `
        <div class="post">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        </div>
    `).join("");
}

if (localStorage.getItem("token")) {
    document.getElementById("logout").style.display = "block";
    carregarPosts();
}
