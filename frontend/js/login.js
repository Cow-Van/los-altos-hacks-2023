if (typeof getToken === "function" && typeof getData === "function") {
    onLoad();
} else {
    window.addEventListener("load", onLoad);
}

async function onLoad() {
    var token = await getToken();

    if (token) {
        return window.location.replace("/");
    }
}

async function login() {
    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
    };

    const res = await postData("/login", { data: data });

    if (!res.ok) {
        throw new Error((await res.json()).description);
    }

    const newData  = await res.json();

    globalThis.token = newData.credential;
    window.location.replace("/");
}