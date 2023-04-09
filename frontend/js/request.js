async function getData(url = "", headers = {}) {
    const response = await fetch(url, {
            method: "GET",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "same-origin",
            headers: Object.assign({
                    "Content-Type": "application/json"
                },
                headers
            ),
            redirect: "follow",
            referrerPolicy: "same-origin",
        });
    return response;
}

async function postData(url = "", { headers = {}, data = {} }) {
    const response = await fetch(url, {
            method: "POST",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "same-origin",
            headers: Object.assign({
                    "Content-Type": "application/json"
                },
                headers
            ),
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
            });
    return response;
}