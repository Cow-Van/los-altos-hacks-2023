if (typeof getToken === "function" && typeof getData === "function") {
    onLoad();
} else {
    window.addEventListener("load", onLoad);
}

async function onLoad() {
    const token = await getToken();

    if (token) {
        window.location.replace("/");
    }
}

async function signUp() {
    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
    };

    const res = await postData("/signup", data);

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const userData = await res.json();

    console.log(userData);
}