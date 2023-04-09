if (typeof getToken === "function" && typeof getData === "function") {
    onLoad();
} else {
    window.addEventListener("load", onLoad);
}

async function onLoad() {
    var token = await getToken();

    if (!token) {
        return window.location.replace("/login.html");
    }
}

async function submit() {
    const data = {}

    if (!document.getElementById("answer-input1").value || !document.getElementById("answer-input2").value || !document.getElementById("image-input").files[0]) {
        return alert("Complete all fields");
    }

    let request = new XMLHttpRequest();
    request.open("POST", "/api/recipes/upload", true);
    request.onload = async () => {
        let response = JSON.parse(request.response);

        data.meal_of_day = document.getElementById("dropdown-menu").value;
        data.ingredients = document.getElementById("answer-input1").value;
        data.steps = document.getElementById("answer-input2").value;
        data.image = response.path;

        await postData("https://localhost/api/recipes", { data: data, headers: { "Authorization" : `Bearer ${token}` }});
        window.location.replace("/");
    }

    request.send(new FormData(document.getElementById("image-form")));
}