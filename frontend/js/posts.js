const apiUrl = "http://localhost:3000";
const token = localStorage.getItem("token");

async function loadPosts() {
    const response = await fetch(`${apiUrl}/posts`, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    const posts = await response.json();
    const postList = document.getElementById("postList");
    postList.innerHTML = "";

    posts.forEach(post => {
        const li = document.createElement("li");
        li.textContent = post.title;
        postList.appendChild(li);
    });
}

async function savePost() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    await fetch(`${apiUrl}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
    });

    window.location.href = "home.html";
}

if (window.location.pathname.includes("home.html")) {
    loadPosts();
}
