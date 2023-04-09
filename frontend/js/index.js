if (typeof getToken === "function" && typeof getData === "function") {
    onLoad();
} else {
    window.addEventListener("load", onLoad);
}

async function onLoad() {
    const token = await getToken();

    if (!token) {
        // return window.location.replace("/login.html");
    }

    const res = await getData("https://localhost/api/self/", {
        "Authorization": `Bearer ${token}`,
    });
    const data = await res.json();

    document.getElementById("name").innerText = `${data.first_name} ${data.last_name}`;
}