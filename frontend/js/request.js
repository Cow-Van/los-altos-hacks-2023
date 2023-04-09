async function getData(url = "", headers = {}, clear = false) {
    const response = await fetch(url, {
            method: "GET",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "same-origin",
            headers: Object.assign(clear ? {} : {
                    "Content-Type": "application/json"
                },
                headers
            ),
            redirect: "follow",
            referrerPolicy: "same-origin",
        });
    return response;
}

async function postData(url = "", { headers = {}, data = {}, clear = false }) {
    const response = await fetch(url, {
            method: "POST",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "same-origin",
            headers: Object.assign(clear ? {} : {
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