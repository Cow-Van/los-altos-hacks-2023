if (typeof getToken === "function" && typeof getData === "function") {
    onLoad();
} else {
    window.addEventListener("load", onLoad);
}

async function onLoad() {
    const token = await getToken();

    console.log(token);

    if (token) {
        window.location.replace("/");
    }
}

async function login() {
    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
    };

    const res = await postData("/login", data);
    const newData  = await res.json();

    globalThis.token = newData.credential;
    window.location.replace("/");
}