function signUp() {
    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    };

    fetch("/signup", options)
        .then(async res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }

            return await res.json();
        }).then(data => {
            console.log(data);
        }).catch(e => {
            console.error("Error: ", e);
        });
}