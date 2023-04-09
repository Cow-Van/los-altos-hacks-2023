async function getToken() {
    if (typeof token !== "undefined" && token !== null) {
        return token;
    }

    const res = await getData("https://localhost/refresh_token");

    if (res.status === 400 || res.status === 401) {
        return null;
    }

    const data = await res.json();

    globalThis.token = data.credential;
    return data.credential;
}

function getCookie(name) {
    let dc = document.cookie;
    let prefix = name + "=";
    let begin = dc.indexOf("; " + prefix);
    let end

    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) {
            return null;
        }
    } else {
        begin += 2;
        end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }

    return decodeURI(dc.substring(begin + prefix.length, end));
}